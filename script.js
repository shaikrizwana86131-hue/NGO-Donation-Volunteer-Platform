
// HopeHands - Donation Functionality

const donationForm = document.getElementById("donationForm");

if (donationForm) {

    const campaignSelect = document.getElementById("campaignSelect");
    const donationAmount = document.getElementById("donationAmount");
    const customAmountBox = document.getElementById("customAmountBox");
    const customAmount = document.getElementById("customAmount");
    const donationMessage = document.getElementById("donationMessage");

    // Read campaign from URL
    const params = new URLSearchParams(window.location.search);
    const selectedCampaign = params.get("campaign");

    if (selectedCampaign) {
        campaignSelect.value = selectedCampaign;
    }

    // Show custom amount field
    donationAmount.addEventListener("change", function () {
        const isCustom = donationAmount.value === "custom";

        customAmountBox.hidden = !isCustom;
        customAmount.required = isCustom;
    });

    // Submit donation
    donationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("donorName").value.trim();
        const email = document.getElementById("donorEmail").value.trim();
        const campaign = campaignSelect.value;

        let amount;

        if (donationAmount.value === "custom") {
            amount = Number(customAmount.value);
        } else {
            amount = Number(donationAmount.value);
        }

        if (name.length < 3) {
            alert("Please enter a valid name.");
            return;
        }

        if (!campaign) {
            alert("Please select a campaign.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Please enter a valid donation amount.");
            return;
        }

        const donation = {
            id: Date.now(),
            name: name,
            email: email,
            campaign: campaign,
            amount: amount,
            date: new Date().toISOString()
        };

        // Get existing donations
        let donations = JSON.parse(
            localStorage.getItem("hopeHandsDonations") || "[]"
        );

        // Save new donation
        donations.push(donation);

        localStorage.setItem(
            "hopeHandsDonations",
            JSON.stringify(donations)
        );

        donationMessage.textContent =
            "Thank you! Your demo donation of ₹" +
            amount.toLocaleString("en-IN") +
            " has been recorded successfully.";

        donationForm.reset();
        customAmountBox.hidden = true;
        customAmount.required = false;
    });
}
// HOPEHANDS DONATION FORM

if (donationForm) {

    const campaignSelect = document.getElementById("campaignSelect");
    const donationAmount = document.getElementById("donationAmount");
    const customAmountBox = document.getElementById("customAmountBox");
    const customAmount = document.getElementById("customAmount");
    const donationMessage = document.getElementById("donationMessage");

    // Select campaign from URL
    const params = new URLSearchParams(window.location.search);
    const selectedCampaign = params.get("campaign");

    if (selectedCampaign) {
        campaignSelect.value = selectedCampaign;
    }

    // Show custom amount field
    donationAmount.addEventListener("change", function () {
        customAmountBox.hidden = donationAmount.value !== "custom";
        customAmount.required = donationAmount.value === "custom";
    });

    // Submit donation
    donationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("donorName").value.trim();
        const email = document.getElementById("donorEmail").value.trim();
        const campaign = campaignSelect.value;

        let amount;

        if (donationAmount.value === "custom") {
            amount = Number(customAmount.value);
        } else {
            amount = Number(donationAmount.value);
        }
        console.log({ name, email, campaign, amount });

        if (!name || !email || !campaign || !Number.isFinite(amount) || amount <= 0) {
            donationMessage.textContent = "Please enter valid donation details.";
            return;
        }

        donationMessage.textContent = "Processing your demo donation...";

        try {
            const response = await fetch("/api/donations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    campaign,
                    amount
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Donation failed.");
            }

            donationMessage.textContent = result.message;
            donationForm.reset();
            customAmountBox.hidden = true;

        } catch (error) {
            donationMessage.textContent =
                "Unable to submit donation. Please check that the server is running.";
            console.error(error);
        }
    });
}
// DYNAMIC CAMPAIGN PROGRESS

const campaignCards = document.querySelectorAll(".campaign-card");

if (campaignCards.length > 0) {

    async function updateCampaignProgress() {

        try {
            const response = await fetch("/api/campaigns");

            if (!response.ok) {
                throw new Error("Unable to load campaign data");
            }

            const campaigns = await response.json();

            campaigns.forEach(campaign => {

                const card = document.querySelector(
                    `[data-campaign="${campaign.id}"]`
                );

                if (!card) return;

                const raisedElement = card.querySelector(".raised");
                const goalElement = card.querySelector(".goal");
                const progressFill = card.querySelector(".progress-fill");
                const progressText = card.querySelector(".progress-text");

                raisedElement.textContent =
                    "Raised: ₹" + campaign.raised.toLocaleString("en-IN");

                goalElement.textContent =
                    "Goal: ₹" + campaign.goal.toLocaleString("en-IN");

                progressFill.style.width = campaign.percentage + "%";

                progressText.textContent =
                    campaign.percentage + "% Funded";
            });

        } catch (error) {
            console.error("Campaign update error:", error);
        }
    }

    // Load campaign data immediately
    updateCampaignProgress();

    // Automatically update every 3 seconds
    setInterval(updateCampaignProgress, 3000);
}
