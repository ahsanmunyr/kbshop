export default function findVariant(product, options) {
    return product.variants.find((variant) => {
        return variant.selectedOptions.every((selectedOption) => {
            return options[selectedOption.name] === selectedOption.value.valueOf();
        });
    });
}