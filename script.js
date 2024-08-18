document.addEventListener('DOMContentLoaded', (event) => {
    loadTableData();
});

function addRowFromForm() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (id && name && age) {
        const table = document.querySelector('#studentTable tbody');
        const newRow = table.insertRow();
        
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        
        cell1.textContent = id; // ID
        cell2.textContent = name; // Name
        cell3.textContent = age; // Age
        cell4.innerHTML = '<button onclick="deleteRow(this)">Delete</button>'; // Action

        // Store the new row data
        storeTableData();

        // Clear form inputs
        document.getElementById('dataForm').reset();
    } else {
        alert("Please enter all fields.");
    }
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.remove();
    storeTableData(); // Update Local Storage after deleting a row
}

function storeTableData() {
    const table = document.querySelector('#studentTable tbody');
    const rows = table.querySelectorAll('tr');
    const tableData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = {
            id: cells[0].textContent,
            name: cells[1].textContent,
            age: cells[2].textContent
        };
        tableData.push(rowData);
    });

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadTableData() {
    const tableData = JSON.parse(localStorage.getItem('tableData'));

    if (tableData) {
        const table = document.querySelector('#studentTable tbody');
        tableData.forEach(rowData => {
            const newRow = table.insertRow();
            
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);
            
            cell1.textContent = rowData.id; // ID
            cell2.textContent = rowData.name; // Name
            cell3.textContent = rowData.age; // Age
            cell4.innerHTML = '<button onclick="deleteRow(this)">Delete</button>'; // Action
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('studentTable');
    const cols = table.querySelectorAll('th');
    let startX, startWidth;

    cols.forEach(function(col) {
        col.addEventListener('mousedown', function(e) {
            startX = e.pageX;
            startWidth = col.offsetWidth;
            document.addEventListener('mousemove', resizeColumn);
            document.addEventListener('mouseup', stopResize);
        });
    });

    function resizeColumn(e) {
        const width = startWidth + (e.pageX - startX);
        e.target.style.width = `${width}px`;
    }

    function stopResize() {
        document.removeEventListener('mousemove', resizeColumn);
        document.removeEventListener('mouseup', stopResize);
    }
});
window.onload = function() {
    resizeFunction(); // Call on page load
};

window.onresize = function() {
    resizeFunction(); // Call on window resize
};

function resizeFunction() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    if (width < 600) {
        document.body.style.backgroundColor = "lightblue";
    } else {
        document.body.style.backgroundColor = "white";
    }
}
if (window.innerWidth < 600) {
    // Code to adjust layout for small screens
    document.querySelector('.sidebar').style.display = 'none';
}
