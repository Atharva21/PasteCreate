import "../css/Button.css";

const STYLES = [
    'btn-primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({ text, type, onClick, buttonStyle, buttonSize }) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const CheckButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return (
        <button className={`btn ${checkButtonStyle} ${CheckButtonSize}`} onClick={onClick} type={type}>
            {text}
        </button>
    )
}