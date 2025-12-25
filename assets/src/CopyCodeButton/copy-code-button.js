import { LitElement, html, css } from "lit";
import { copyIcon, checkIcon } from "../icons.js";

export class CopyCodeButton extends LitElement {
  static properties = {
    copied: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    
    button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.5rem;
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      color: #333;
      transition: all 0.2s ease;
    }
    
    button:hover {
      background-color: #e9e9e9;
    }
    
    button svg {
      width: 14px;
      height: 14px;
    }
    
    .copied {
      background: #e8f5e9 !important;
      color: #2e7d32;
    }
  `;

  constructor() {
    super();
    this.copied = false;
  }

  async copyCode() {
    const pre = this.closest('pre');
    const code = pre?.querySelector('code');
    if (code) {
      try {
        await navigator.clipboard.writeText(code.textContent);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  }

  render() {
    return html`
      <button 
        class=${this.copied ? 'copied' : ''} 
        @click=${this.copyCode}
        title="Copy to clipboard"
      >
        ${this.copied ? checkIcon : copyIcon}
        ${this.copied ? 'Copied!' : 'Copy Code'}
      </button>
    `;
  }
}

customElements.define('copy-code-button', CopyCodeButton);