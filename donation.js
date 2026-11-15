document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("donationForm");

    if (!form) return;

    const nameInput = document.getElementById("donorName");
    const emailInput = document.getElementById("donorEmail");
    const campaignSelect = document.getElementById("campaignSelect");
    const amountSelect = document.getElementById("donationAmount");
    const customBox = document.getElementById("customAmountBox");
    const customInput = document.getElementById("customAmount");
    const message = document.getElementById("donationMessage");

    // Select campaign from URL
    const params = new URLSearchParams(window.location.search);
    const selectedCampaign = params.get("campaign");

    if (selectedCampaign) {
        campaignSelect.value = selectedCampaign;
    }

    // Show custom amount field
    amountSelect.addEventListener("change", function () {
        const isCustom = amountSelect.value === "custom";
        customBox.hidden = !isCustom;
        customInput.required = isCustom;
    });

    // Submit donation
    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const campaign = campaignSelect.value;

        const amount = amountSelect.value === "custom"
            ? Number(customInput.value)
            : Number(amountSelect.value);

        if (
            !name ||
            !email ||
            !campaign ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            message.textContent = "Please enter valid donation details.";
            return;
        }

        message.textContent = "Processing demo donation...";

        try {

            const response = await fetch("/api/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    campaign: campaign,
                    amount: amount
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Donation failed.");
            }

            message.textContent = "Donation recorded successfully!";

            form.reset();
            customBox.hidden = true;
            customInput.required = false;

        } catch (error) {

            console.error(error);

            message.textContent =
                "Donation failed. Please check whether the server is running.";

        }

    });

});