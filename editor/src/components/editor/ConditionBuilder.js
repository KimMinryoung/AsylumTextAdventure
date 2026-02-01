import React, { useState } from 'react';
import { CONDITION_TYPES, NPCS, LOCATIONS, OPERATORS, KNOWN_ITEMS, KNOWN_FLAGS } from '../../utils/constants';
import './ConditionBuilder.css';

export default function ConditionBuilder({ onAdd, onCancel }) {
  const [conditionType, setConditionType] = useState('hasItem');
  const [params, setParams] = useState({});

  const selectedType = CONDITION_TYPES.find(t => t.id === conditionType);

  const handleParamChange = (paramName, value) => {
    setParams(prev => ({ ...prev, [paramName]: value }));
  };

  const handleAdd = () => {
    const paramValues = selectedType.params.map(p => params[p] || '');

    // 유효성 검사
    if (paramValues.some(v => v === '')) {
      alert('모든 파라미터를 입력해주세요.');
      return;
    }

    onAdd({
      type: conditionType,
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

      case 'operator':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">연산자</label>
            <select
              className="select"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
            >
              <option value="">선택...</option>
              {OPERATORS.map(op => (
                <option key={op.id} value={op.id}>{op.label}</option>
              ))}
            </select>
          </div>
        );

      case 'value':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">값</label>
            <input
              type="number"
              className="input"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
              placeholder="숫자 입력"
            />
          </div>
        );

      case 'probability':
        return (
          <div className="param-group" key={paramName}>
            <label className="label">확률 (0~1)</label>
            <input
              type="number"
              className="input"
              min="0"
              max="1"
              step="0.1"
              value={params[paramName] || ''}
              onChange={(e) => handleParamChange(paramName, e.target.value)}
              placeholder="0.5"
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
        <span>조건 추가</span>
      </div>

      <div className="builder-body">
        <div className="form-group">
          <label className="label">조건 타입</label>
          <select
            className="select"
            value={conditionType}
            onChange={(e) => {
              setConditionType(e.target.value);
              setParams({});
            }}
          >
            {CONDITION_TYPES.map(type => (
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
        <button className="btn btn-primary btn-sm" onClick={handleAdd}>
          추가
        </button>
      </div>
    </div>
  );
}
