const USDFormat = (valueInCents) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(valueInCents / 100);

export default USDFormat;