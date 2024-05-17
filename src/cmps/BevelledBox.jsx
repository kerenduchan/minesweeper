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
            height: `${bevelWidth}px`,
            backgroundImage,
        }
    }

    function getBevelStyle() {
        return {
            borderWidth: `${bevelWidth}px`,
        }
    }

    function getBevelClass() {
        return isInset ? 'inset' : 'outset'
    }

    function getContentStyle() {
        return {
            padding: `${padding + bevelWidth}px`,
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
