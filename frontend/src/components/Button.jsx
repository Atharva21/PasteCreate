import "../css/Button.css";

const STYLES = [
    'btn-primary',
    'btn--outline',
    'btn--outline-flex-end'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({ text, type, onClick, buttonStyle, buttonSize }) => {
    if (!buttonStyle) {
        buttonStyle = STYLES[0];
    }
    if (!buttonSize) {
        buttonSize = SIZES[0];
    }
    return (
        <button className={`btn ${buttonStyle} ${buttonSize}`} onClick={onClick} type={type}>
            {text}
        </button>
    )
}