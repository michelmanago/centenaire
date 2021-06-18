export default function SelectParoisse({paroisse, setParoisse}) {
    return (
        <div>
        <label htmlFor="paroisse" className="ml-2 font-bold">Choisissez une paroisse:</label>
            <select
                id="paroisse"
                className="p-2 m-1 border border-gray-500 w-72"
                value={paroisse}
                onChange={e => setParoisse(e.target.value)}
            >
            <option value="">-- Paroisse --</option>
            <option value="Chaville">Notre-Dame Souveraine à Chaville</option>
            <option value="Dormition">Notre Dame de la Dormition</option>
            <option value="Daru">Cathédrale Saint Alexandre Nevski</option>
            <option value="Crypte">Crypte de la cathédrale</option>
            <option value="SaintPrix">Saint Prix</option>
            <option value="Troyes">Troyes</option>
            </select>
        </div>
)
}
