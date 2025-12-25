// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, looking for code blocks...');
  
  // Find all code blocks - try different selectors to be more flexible
  const selectors = [
    'pre > code',  // Standard markdown style
    'pre'          // Just a pre tag
  ];
  
  let codeBlocks = [];
  
  // Try each selector and collect unique code blocks
  selectors.forEach(selector => {
    const blocks = document.querySelectorAll(selector);
    blocks.forEach(block => {
      // Only add if not already in our array
      if (!codeBlocks.includes(block)) {
        codeBlocks.push(block);
      }
    });
  });
  
  console.log(`Found ${codeBlocks.length} code blocks`);
  
  codeBlocks.forEach(block => {
    const pre = block.tagName === 'PRE' ? block : block.closest('pre') || block.parentElement;
    
    // Skip if no parent pre element found
    if (!pre) {
      console.warn('No parent pre element found for code block', block);
      return;
    }
    
    // Skip if this pre already has a copy button
    if (pre.querySelector('copy-code-button')) {
      console.log('Skipping - already has copy button', pre);
      return;
    }
    
    console.log('Adding copy button to', pre);
    
    // Ensure the pre has relative positioning for the absolute button
    pre.style.position = 'relative';
    
    // Create and append the copy button
    const copyButton = document.createElement('copy-code-button');
    pre.insertBefore(copyButton, pre.firstChild);
  });
  
  console.log('Finished adding copy buttons');
});