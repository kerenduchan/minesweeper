export function BevelledBox({
    isInset = true,
    bevelWidth,
    padding = 0,
    children,
}) {
    function getCornerStyle() {
        const backgroundImage = `url(/borders/corner-${bevelWidth}-${
            isInset ? 'inset' : 'outset'
        }.svg)`

        return {
            height: `${bevelWidth}rem`,
            backgroundImage,
        }
    }

    function getBevelStyle() {
        return {
            borderWidth: `${bevelWidth}rem`,
        }
    }

    function getBevelClass() {
        return isInset ? 'inset' : 'outset'
    }

    function getContentStyle() {
        return {
            padding: `${padding + bevelWidth}rem`,
        }
    }

    return (
        <div className="bevelled-box">
            <div
                className={`bevel ${getBevelClass()}`}
                style={getBevelStyle()}
            />

            <div className="corner-overlay">
                <div className="corner-tr" style={getCornerStyle()} />
                <div className="corner-bl" style={getCornerStyle()} />
            </div>

            <div className="content" style={getContentStyle()}>
                {children}
            </div>
        </div>
    )
}
