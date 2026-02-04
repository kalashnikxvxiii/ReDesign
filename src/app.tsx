// Entry point for the ReDesign extension
import React from "react";
import ReactDOM from "react-dom";
import CSSEditorIframe from "./css-editor-iframe.tsx";

// Initialize extension
(async function() {
  console.log('[ReDesign] Initializing extension...');

  // Create container for the editor
  const container = document.createElement('div');
  container.id = 'redesign-css-editor-container';
  document.body.appendChild(container);

  // Render the component
  ReactDOM.render(
    React.createElement(CSSEditorIframe),
    container
  );

  console.log('[ReDesign] Extension initialized successfully!');
})();
