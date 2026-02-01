import React, { useState } from 'react';
import './Header.css';

export default function Header({
  onSave,
  onValidate,
  onRefresh,
  isValidating,
  validationResults
}) {
  const [showValidation, setShowValidation] = useState(false);

  const errorCount = validationResults?.errors?.length || 0;
  const warningCount = validationResults?.warnings?.length || 0;
  const hasIssues = errorCount > 0 || warningCount > 0;

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">Story Editor</h1>
        <span className="header__subtitle">수용소 탈출기</span>
      </div>

      <div className="header__center">
        {/* 검증 상태 표시 */}
        {hasIssues && (
          <button
            className="header__validation-badge"
            onClick={() => setShowValidation(!showValidation)}
          >
            {errorCount > 0 && (
              <span className="badge badge--error">{errorCount} 오류</span>
            )}
            {warningCount > 0 && (
              <span className="badge badge--warning">{warningCount} 경고</span>
            )}
          </button>
        )}

        {/* 검증 결과 드롭다운 */}
        {showValidation && hasIssues && (
          <div className="header__validation-dropdown">
            <div className="validation-dropdown__header">
              <span>검증 결과</span>
              <button onClick={() => setShowValidation(false)}>✕</button>
            </div>
            <ul className="validation-list">
              {validationResults.errors.map((error, idx) => (
                <li key={`err-${idx}`} className="validation-item error">
                  <span className="validation-icon">❌</span>
                  <span>{error.message}</span>
                </li>
              ))}
              {validationResults.warnings.map((warning, idx) => (
                <li key={`warn-${idx}`} className="validation-item warning">
                  <span className="validation-icon">⚠️</span>
                  <span>{warning.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="header__right">
        <button
          className="btn btn-secondary"
          onClick={onRefresh}
          title="데이터 새로고침"
        >
          🔄 새로고침
        </button>

        <button
          className="btn btn-secondary"
          onClick={onValidate}
          disabled={isValidating}
          title="스토리 검증"
        >
          {isValidating ? '검증 중...' : '✓ 검증'}
        </button>

        <button
          className="btn btn-primary"
          onClick={onSave}
          title="파일에 저장"
        >
          💾 저장
        </button>
      </div>
    </header>
  );
}
