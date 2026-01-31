// Story Text Editor - Standalone Application

const API_BASE_URL = 'http://localhost:3001';

const LOCATIONS = [
  'roof', 'yard', 'corridor', 'workshop', 'cell',
  'cafeteria', 'solitary', 'basement', 'sewer'
];

// State
let state = {
  files: { root: [], characters: [], dungeon: [] },
  selectedFile: null,
  fileData: null,
  selectedScene: null,
  hasUnsavedChanges: false,
  expandedDirs: { root: true, characters: false, dungeon: false }
};

// DOM Elements
const elements = {
  fileTree: document.getElementById('file-tree'),
  sceneList: document.getElementById('scene-list'),
  editorContent: document.getElementById('editor-content'),
  currentScene: document.getElementById('current-scene'),
  messageBar: document.getElementById('message-bar'),
  unsavedIndicator: document.getElementById('unsaved-indicator'),
  btnSave: document.getElementById('btn-save')
};

// API Functions
async function apiGetFiles() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/editor/files`);
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Failed to connect to server' };
  }
}

async function apiGetFile(filePath) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/editor/file/${filePath}`);
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Failed to connect to server' };
  }
}

async function apiUpdateScene(filePath, sceneId, sceneData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/editor/scene/${filePath}/${sceneId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sceneData)
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Failed to connect to server' };
  }
}

// UI Functions
function showMessage(text, type = 'info') {
  elements.messageBar.textContent = text;
  elements.messageBar.className = `message-bar ${type}`;
  elements.messageBar.classList.remove('hidden');

  if (type === 'success') {
    setTimeout(() => {
      elements.messageBar.classList.add('hidden');
    }, 2000);
  }
}

function hideMessage() {
  elements.messageBar.classList.add('hidden');
}

function setUnsavedChanges(value) {
  state.hasUnsavedChanges = value;
  if (value) {
    elements.unsavedIndicator.classList.remove('hidden');
    elements.btnSave.disabled = false;
  } else {
    elements.unsavedIndicator.classList.add('hidden');
    elements.btnSave.disabled = true;
  }
}

function confirmUnsavedChanges() {
  if (state.hasUnsavedChanges) {
    return window.confirm('저장하지 않은 변경사항이 있습니다. 계속하시겠습니까?');
  }
  return true;
}

// File Explorer
function renderFileTree() {
  const dirs = [
    { key: 'root', name: 'root/', files: state.files.root, prefix: '' },
    { key: 'characters', name: 'characters/', files: state.files.characters, prefix: 'characters/' },
    { key: 'dungeon', name: 'dungeon/', files: state.files.dungeon, prefix: 'dungeon/' }
  ];

  elements.fileTree.innerHTML = dirs.map(dir => `
    <div class="dir-section">
      <div class="dir-header" data-dir="${dir.key}">
        <span class="dir-arrow">${state.expandedDirs[dir.key] ? '▼' : '▶'}</span>
        <span class="dir-name">${dir.name}</span>
      </div>
      <div class="file-list" style="display: ${state.expandedDirs[dir.key] ? 'block' : 'none'}">
        ${dir.files.map(file => {
          const fullPath = dir.prefix + file;
          const isSelected = state.selectedFile === fullPath;
          return `<div class="file-item ${isSelected ? 'selected' : ''}" data-path="${fullPath}">${file}</div>`;
        }).join('')}
      </div>
    </div>
  `).join('');

  // Add event listeners
  elements.fileTree.querySelectorAll('.dir-header').forEach(el => {
    el.addEventListener('click', () => {
      const dir = el.dataset.dir;
      state.expandedDirs[dir] = !state.expandedDirs[dir];
      renderFileTree();
    });
  });

  elements.fileTree.querySelectorAll('.file-item').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirmUnsavedChanges()) return;
      selectFile(el.dataset.path);
    });
  });
}

// Scene List
function renderSceneList() {
  if (!state.fileData || !state.fileData.scenes) {
    elements.sceneList.innerHTML = '<div class="empty-message">Select a file</div>';
    return;
  }

  const sceneIds = Object.keys(state.fileData.scenes);
  elements.sceneList.innerHTML = sceneIds.map(id => {
    const isSelected = state.selectedScene === id;
    return `<div class="scene-item ${isSelected ? 'selected' : ''}" data-scene="${id}">${id}</div>`;
  }).join('');

  elements.sceneList.querySelectorAll('.scene-item').forEach(el => {
    el.addEventListener('click', () => {
      if (!confirmUnsavedChanges()) return;
      selectScene(el.dataset.scene);
    });
  });
}

// Scene Editor
function renderEditor() {
  if (!state.selectedScene || !state.fileData || !state.fileData.scenes[state.selectedScene]) {
    elements.currentScene.textContent = '';
    elements.editorContent.innerHTML = '<div class="empty-message">Select a scene</div>';
    return;
  }

  const scene = state.fileData.scenes[state.selectedScene];
  elements.currentScene.textContent = state.selectedScene;

  elements.editorContent.innerHTML = `
    <!-- Script Section -->
    <div class="editor-section">
      <div class="section-title">Script:</div>
      <div class="script-lines" id="script-lines">
        ${(scene.script || []).map((line, i) => `
          <div class="script-line">
            <div class="line-number">${i + 1}</div>
            <textarea data-index="${i}" placeholder="Line ${i + 1}">${escapeHtml(line)}</textarea>
            <div class="line-buttons">
              <button class="btn-insert" data-type="script" data-index="${i}" title="Insert above">+</button>
              <button class="btn-remove" data-type="script" data-index="${i}" title="Remove">X</button>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="btn-add" id="add-script-line">+ Add Line</button>
    </div>

    <!-- Actions Section -->
    <div class="editor-section">
      <div class="section-title">Actions:</div>
      <div class="action-lines" id="action-lines">
        ${(scene.actions || []).map((action, i) => `
          <div class="action-line">
            <div class="line-number">${i + 1}</div>
            <input type="text" data-index="${i}" value="${escapeHtml(action)}" placeholder="Action ${i + 1}">
            <div class="line-buttons">
              <button class="btn-insert" data-type="action" data-index="${i}" title="Insert above">+</button>
              <button class="btn-remove" data-type="action" data-index="${i}" title="Remove">X</button>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="btn-add" id="add-action">+ Add Action</button>
    </div>

    <!-- Location Section -->
    <div class="editor-section">
      <div class="section-title">Location:</div>
      <select class="location-select" id="location-select">
        <option value="">-- Select Location --</option>
        ${LOCATIONS.map(loc => `
          <option value="${loc}" ${scene.location === loc ? 'selected' : ''}>${loc}</option>
        `).join('')}
      </select>
    </div>
  `;

  // Add event listeners
  elements.editorContent.querySelectorAll('textarea, input').forEach(el => {
    el.addEventListener('input', () => setUnsavedChanges(true));
  });

  elements.editorContent.querySelector('#location-select').addEventListener('change', () => {
    setUnsavedChanges(true);
  });

  elements.editorContent.querySelector('#add-script-line').addEventListener('click', addScriptLine);
  elements.editorContent.querySelector('#add-action').addEventListener('click', addAction);

  elements.editorContent.querySelectorAll('.btn-remove').forEach(el => {
    el.addEventListener('click', () => {
      const type = el.dataset.type;
      const index = parseInt(el.dataset.index);
      if (type === 'script') removeScriptLine(index);
      else removeAction(index);
    });
  });

  elements.editorContent.querySelectorAll('.btn-insert').forEach(el => {
    el.addEventListener('click', () => {
      const type = el.dataset.type;
      const index = parseInt(el.dataset.index);
      if (type === 'script') insertScriptLine(index);
      else insertAction(index);
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getEditorData() {
  const scriptTextareas = elements.editorContent.querySelectorAll('#script-lines textarea');
  const actionInputs = elements.editorContent.querySelectorAll('#action-lines input');
  const locationSelect = elements.editorContent.querySelector('#location-select');

  return {
    script: Array.from(scriptTextareas).map(el => el.value),
    actions: Array.from(actionInputs).map(el => el.value),
    location: locationSelect ? locationSelect.value : ''
  };
}

function addScriptLine() {
  const scene = state.fileData.scenes[state.selectedScene];
  scene.script = scene.script || [];
  scene.script.push('');
  renderEditor();
  setUnsavedChanges(true);

  // Focus new textarea
  const textareas = elements.editorContent.querySelectorAll('#script-lines textarea');
  if (textareas.length > 0) {
    textareas[textareas.length - 1].focus();
  }
}

function insertScriptLine(atIndex) {
  const scene = state.fileData.scenes[state.selectedScene];
  scene.script = scene.script || [];
  scene.script.splice(atIndex, 0, '');
  renderEditor();
  setUnsavedChanges(true);

  // Focus the newly inserted textarea
  const textareas = elements.editorContent.querySelectorAll('#script-lines textarea');
  if (textareas[atIndex]) {
    textareas[atIndex].focus();
  }
}

function removeScriptLine(index) {
  const scene = state.fileData.scenes[state.selectedScene];
  scene.script.splice(index, 1);
  renderEditor();
  setUnsavedChanges(true);
}

function addAction() {
  const scene = state.fileData.scenes[state.selectedScene];
  scene.actions = scene.actions || [];
  scene.actions.push('');
  renderEditor();
  setUnsavedChanges(true);

  // Focus new input
  const inputs = elements.editorContent.querySelectorAll('#action-lines input');
  if (inputs.length > 0) {
    inputs[inputs.length - 1].focus();
  }
}

function insertAction(atIndex) {
  const scene = state.fileData.scenes[state.selectedScene];
  scene.actions = scene.actions || [];
  scene.actions.splice(atIndex, 0, '');
  renderEditor();
  setUnsavedChanges(true);

  // Focus the newly inserted input
  const inputs = elements.editorContent.querySelectorAll('#action-lines input');
  if (inputs[atIndex]) {
    inputs[atIndex].focus();
  }
}

function removeAction(index) {
  const scene = state.fileData.scenes[state.selectedScene];
  scene.actions.splice(index, 1);
  renderEditor();
  setUnsavedChanges(true);
}

// Selection Handlers
async function selectFile(filePath) {
  showMessage('Loading...', 'info');

  const result = await apiGetFile(filePath);
  if (result.success) {
    state.selectedFile = filePath;
    state.fileData = result.data;
    state.selectedScene = null;
    setUnsavedChanges(false);
    hideMessage();
    renderFileTree();
    renderSceneList();
    renderEditor();
  } else {
    showMessage('Failed to load file: ' + result.error, 'error');
  }
}

function selectScene(sceneId) {
  state.selectedScene = sceneId;
  setUnsavedChanges(false);
  renderSceneList();
  renderEditor();
}

// Save Handler
async function saveScene() {
  if (!state.selectedFile || !state.selectedScene) return;

  const data = getEditorData();
  showMessage('Saving...', 'info');

  const result = await apiUpdateScene(state.selectedFile, state.selectedScene, data);
  if (result.success) {
    state.fileData.scenes[state.selectedScene] = result.scene;
    setUnsavedChanges(false);
    showMessage('저장되었습니다!', 'success');
    renderEditor();
  } else {
    showMessage('Failed to save: ' + result.error, 'error');
  }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl+S to save
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    if (!elements.btnSave.disabled) {
      saveScene();
    }
  }
});

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', (e) => {
  if (state.hasUnsavedChanges) {
    e.preventDefault();
    e.returnValue = '';
  }
});

// Initialize
async function init() {
  elements.btnSave.addEventListener('click', saveScene);

  showMessage('Loading files...', 'info');
  const result = await apiGetFiles();

  if (result.success) {
    state.files = result.files;
    hideMessage();
    renderFileTree();
    renderSceneList();
    renderEditor();
  } else {
    showMessage('Failed to load files: ' + result.error, 'error');
  }
}

init();
