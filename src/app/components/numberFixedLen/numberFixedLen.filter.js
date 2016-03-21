export function numberFixedLen() {
    return (a, b) => a?('0'.repeat(b) + a).slice(-b):'';
}