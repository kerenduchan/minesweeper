export function CustomForm() {
    return (
        <form className="custom-form">
            <label for="height">Height</label>
            <input id="height" type="text"></input>

            <label for="width">Width</label>
            <input id="width" type="text"></input>

            <label for="mines">Mines</label>
            <input id="mines" type="text"></input>
        </form>
    )
}
