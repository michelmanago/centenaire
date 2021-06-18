export default function SelectCompositeur({compositeur, setCompositeur}) {
    return (
        <div>
        <label htmlFor="paroisse">Choisissez un compositeur:</label>
            <select
                id="compositeur"
                className="p-2 m-1 border border-gray-500 w-60"
                value={compositeur}
                onChange={e => setCompositeur(e.target.value)}
            >
            <option value="">-- Compositeur --</option>
            <option value="KedroffP">Nicolas Kedroff père</option>
            <option value="KedroffF">Nicolas Kedroff fils</option>
            <option value="Evetz">Eugène Evetz</option>
            </select>
        </div>
)
}
