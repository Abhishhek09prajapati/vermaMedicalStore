document.addEventListener("DOMContentLoaded", () => {
    // 1. Select Form Inputs (Mapped exactly to your 9 inputs)
    const inputs = document.querySelectorAll(".form-group input");
    const customerInput = inputs[0]; // Customer Name
    const doctorInput = inputs[1];   // Doctor Name
    const medicineInput = inputs[2]; // Medicine Name
    const quantityInput = inputs[3]; // Quantity
    const mrpInput = inputs[4];      // MRP
    const batchInput = inputs[5];    // Batch Number
    const expiryInput = inputs[6];   // Expiry Date
    const serialInput = inputs[7];   // Serial No.
    const dateInput = inputs[8];     // Date

    // 2. Select Invoice Preview Elements
    // Using querySelectorAll to bypass the duplicate "preview-patient" ID bug in your HTML
    const patientDetailsSpans = document.querySelectorAll(".patient-details span");
    const previewCustomer = patientDetailsSpans[0]; 
    const previewDoctor = patientDetailsSpans[1];   
    const previewDate = document.getElementById("daate");
    const previewSerial = document.getElementById("serialnumber");
    
    // 3. Select Table & Button Elements
    const tableBody = document.querySelector(".invoice-table tbody");
    const totalAmountCell = document.querySelector(".invoice-table tfoot td:last-child");
    const addButton = document.querySelector(".btn-primary");

    let totalBillAmount = 0;

    // 4. Add Click Event to the Button
    addButton.addEventListener("click", () => {
        // --- Update Invoice Header Details ---
        if (previewCustomer) previewCustomer.textContent = customerInput.value || "-";
        if (previewDoctor) previewDoctor.textContent = doctorInput.value || "-";
        if (previewSerial) previewSerial.textContent = serialInput.value || "-";
        
        // Format the date to standard Indian format (DD/MM/YYYY)
        if (dateInput.value) {
            const dateObj = new Date(dateInput.value);
            previewDate.textContent = dateObj.toLocaleDateString("en-IN");
        } else {
            previewDate.textContent = "-";
        }

        // --- Extract Item Details ---
        const medicineName = medicineInput.value.trim();
        const quantity = parseInt(quantityInput.value) || 0;
        const mrp = parseFloat(mrpInput.value) || 0;
        const batch = batchInput.value.trim() || "-";
        const expiry = expiryInput.value.trim() || "-";

        // Basic Validation
        if (!medicineName || quantity <= 0 || mrp <= 0) {
            alert("Please enter a valid Medicine Name, Quantity, and MRP.");
            return; 
        }

        // --- Calculate Amount ---
        const itemAmount = quantity * mrp;
        totalBillAmount += itemAmount;

        // --- Create and Add to Table ---
        // Your table has exactly 6 columns: Items, Quantity, Batch, Expiry, MRP, Amount
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${medicineName}</td>
            <td>${quantity}</td>
            <td>${batch}</td>
            <td>${expiry}</td>
            <td>₹${mrp.toFixed(2)}</td>
            <td class="text-right">₹${itemAmount.toFixed(2)}</td>
        `;
        
        tableBody.appendChild(row);

        // Update the Total Amount
        totalAmountCell.textContent = `₹${totalBillAmount.toFixed(2)}`;

        // --- Auto-Clear Item Inputs ---
        // Clears the medicine inputs so you can quickly type the next item
        medicineInput.value = "";
        quantityInput.value = "";
        mrpInput.value = "";
        batchInput.value = "";
        expiryInput.value = "";
    });
});