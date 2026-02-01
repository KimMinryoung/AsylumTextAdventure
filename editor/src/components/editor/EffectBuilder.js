import React, { useState } from 'react';
import { EFFECT_TYPES, NPCS, LOCATIONS, KNOWN_ITEMS, KNOWN_FLAGS } from '../../utils/constants';
import './ConditionBuilder.css'; // 공유 스타일

export default function EffectBuilder({ onAdd, onCancel }) {
  const [effectType, setEffectType] = useState('addItem');
  const [params, setParams] = useState({});

  const selectedType = EFFECT_TYPES.find(t => t.id === effectType);

  const handleParamChange = (paramName, value) => {
    setParams(prev => ({ ...prev, [paramName]: value }));
  };

  const handleAdd = () => {
    const paramValues = selectedType.params.map(p => {
      const val = params[p];
      // 숫자 타입 변환
      if (p === 'delta') {
        return parseInt(val, 10) || 0;
      }
      return val || '';
    });

    // 유효성 검사
    if (paramValues.some(v => v === '')) {
      alert('모든 파라미터를 입력해주세요.');
      return;
    }

    onAdd({
      type: effectType,
      params: paramValues
    });

    // 초기화
    setParams({});
  };

  const renderParamInput = (paramName) => {
    switch (paramName) {
      case 'itemId':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">아이템</label>
            <select
              className="select"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            >
              <option value="">선택...</option>
              {KNOWN_ITEMS.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <input
              type="text"
              className="input input-sm"
              placeholder="또는 직접 입력"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            />
          </div>
        );

      case 'flagName':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">플래그</label>
            <select
              className="select"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            >
              <option value="">선택...</option>
              {KNOWN_FLAGS.map(flag => (
                <option key={flag} value={flag}>{flag}</option>
              ))}
            </select>
            <input
              type="text"
              className="input input-sm"
              placeholder="또는 직접 입력"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            />
          </div>
        );

      case 'npcId':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">NPC</label>
            <select
              className="select"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            >
              <option value="">선택...</option>
              {NPCS.map(npc => (
                <option key={npc.id} value={npc.id}>{npc.name}</option>
              ))}
            </select>
          </div>
        );

      case 'delta':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">변화량</label>
            <input
              type="number"
              className="input"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
              placeholder="-5 ~ +5"
            />
          </div>
        );

      case 'locationId':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">위치</label>
            <select
              className="select"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            >
              <option value="">선택...</option>
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.icon} {loc.name}</option>
              ))}
            </select>
          </div>
        );

      case 'endingId':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">엔딩 ID</label>
            <input
              type="text"
              className="input"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
              placeholder="엔딩 씬 ID"
            />
          </div>
        );

      default:
        return (
          <div className="param-group" key={paramName}>
            <label className="label">{paramName}</label>
            <input
              type="text"
              className="input"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div className="builder-card">
      <div className="builder-header">
        <span>효과 추가</span>
      </div>

      <div className="builder-body">
        <div className="form-group">
          <label className="label">효과 타입</label>
          <select
            className="select"
            value={effectType}
            onChange={(e) => {
              setEffectType(e.target.value);
              setParams({});
            }}
          >
            {EFFECT_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        {selectedType?.params.map(renderParamInput)}
      </div>

      <div className="builder-footer">
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>
          취소
        </button>
        <button className="btn btn-success btn-sm" onClick={handleAdd}>
          추가
        </button>
      </div>
    </div>
  );
}
