import { BevelledBox } from './BevelledBox'

export function Counter({ value, className = '' }) {
    function getDigitSvg(idx) {
        let valueStr = String(Math.abs(value)).padStart(2, '0')

        if (value < 0) {
            valueStr = '-' + valueStr
        } else if (value <= 99) {
            valueStr = '0' + valueStr
        }
        const digit = valueStr[idx]
        return `counters/${digit}.svg`
    }

    return (
        <div className={`counter ${className}`}>
            <BevelledBox isInset={true} bevelWidth={1}>
                {[0, 1, 2].map((idx) => (
                    <img
                        key={idx}
                        className="digit-img"
                        src={getDigitSvg(idx)}
                    />
                ))}
            </BevelledBox>
        </div>
    )
}
