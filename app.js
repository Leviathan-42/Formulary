// Tab switching functionality
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding content
        const tabName = tab.getAttribute('data-tab');
        document.getElementById(tabName).classList.add('active');
    });
});

// Module switching functionality
const moduleItems = document.querySelectorAll('.module-item');

moduleItems.forEach(item => {
    item.addEventListener('click', () => {
        moduleItems.forEach(m => m.classList.remove('active'));
        item.classList.add('active');

        const moduleName = item.getAttribute('data-module');
        loadModuleContent(moduleName);
    });
});

function loadModuleContent(moduleName) {
    // This function can be expanded to load different module content
    console.log(`Loading content for ${moduleName}`);
    // You can add logic here to fetch and display module-specific content
}

// Notes are now read-only, no need for save functionality

// Practice problems - Check answer functionality
const checkButtons = document.querySelectorAll('.check-btn');

checkButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        const problemCard = e.target.closest('.problem-card');
        const solution = problemCard.querySelector('.solution');

        if (solution.style.display === 'none') {
            solution.style.display = 'block';
            btn.textContent = 'Hide Solution';
        } else {
            solution.style.display = 'none';
            btn.textContent = 'Check Answer';
        }
    });
});

// PowerPoint document viewer
// This would require a backend service or API to convert PPTX to viewable format
// For now, this is a placeholder for future implementation

async function loadDocuments() {
    // In a real implementation, you would fetch the list of documents from a server
    // For now, this is a placeholder
    const docsFolder = 'docs/module3/';

    // Example of how you might load documents in the future:
    // fetch('/api/documents/module3')
    //     .then(response => response.json())
    //     .then(files => displayDocumentList(files));
}

function displayDocumentList(files) {
    const fileList = document.querySelector('.file-list');
    fileList.innerHTML = '';

    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button onclick="viewDocument('${file.path}')">View</button>
        `;
        fileList.appendChild(fileItem);
    });
}

function viewDocument(path) {
    const docViewer = document.getElementById('docViewer');
    const docFrame = document.getElementById('docFrame');

    // Display PDF directly in iframe (works for local files)
    docFrame.src = path;

    docViewer.style.display = 'block';
}

function closeViewer() {
    const docViewer = document.getElementById('docViewer');
    const docFrame = document.getElementById('docFrame');

    docViewer.style.display = 'none';
    docFrame.src = '';
}

// Initialize MathJax rendering
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    svg: {
        fontCache: 'global'
    }
};

// Re-render MathJax when switching tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        setTimeout(() => {
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        }, 100);
    });
});
