export var appMetadata = {
    name: "Abiapay Agent Portal",
    version: "1.0.0",
    description: "A portal for managing Abiapay agent operations.",
    author: "Your Name",
    license: "MIT",
    repository: "https://github.com/yourusername/abiapay-agent-portal",
    homepage: "https://yourhomepage.com",
    banksAllowed: [
        { name: "Wallet" , value: "access", allowed: true },
        // Add Hydrogen payment methods
        { name: "Card Payment (POS)", value: "card", allowed: true },
        { name: "BreezePay", value: "breezepay", allowed: true },
        { name: "Transfer/InstantPay", value: "transfer", allowed: true },
    ],
};
export var bankOptions = appMetadata.banksAllowed
    .filter(function (bank) { return bank.allowed; })
    .map(function (bank) { return ({
    value: bank.value,
    label: bank.name,
}); });

// Payment method options (wallet/card/transfer)
export var paymentMethodOptions = [
    { value: "wallet", label: "Wallet" },
    { value: "card", label: "Card Payment (POS)" },
    { value: "transfer", label: "Bank Transfer/InstantPay" },
];

// Wallet type options (only shown when payment_method is wallet)
export var walletTypeOptions = [
    { value: "access", label: "Access Bank" },
];
