
// libs
import { useState } from "react";

const InputAddBlock = ({addBlock}) => {
    const [type, setType] = useState('text');
    return (
        <div>
            <div>Ajouter un Bloc</div>
            <select
                className="px-1 mx-1 border rounded"
                defaultValue={type}
                onChange={e => setType(e.currentTarget.value)}
            >
                <option value="">--- Block Type ---</option>
                <option value="text">Text</option>
                <option value="carousel">Carousel</option>
            </select>
            <button className="px-1 mx-1 border rounded cursor-pointer" onClick={() => addBlock(type)}>
                Ajouter
            </button>
        </div>
    );
};

export default InputAddBlock