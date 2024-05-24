export function CustomForm() {
    return (
        <form className="custom-form">
            <label htmlFor="height">Height</label>
            <input id="height" type="text"></input>

            <label htmlFor="width">Width</label>
            <input id="width" type="text"></input>

            <label htmlFor="mines">Mines</label>
            <input id="mines" type="text"></input>
        </form>
    )
}
