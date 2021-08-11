const CLASS_EFFECT = {
    imgFloatLeft: {
        className: "page__imgfloatleft",
        effect: "img-float-left"
    },

    imgFloatRight: {
        className: "page__imgfloatright",
        effect: "img-float-right"
    },

    alignLeft: {
        className: "text-left",
        effect: "align-left",
    },

    alignLeft: {
        className: "text-right",
        effect: "align-right",
    },
}

// get all classEffects as Array
export const classEffectArray = Object.values(CLASS_EFFECT)


// From class to effect
export function getClassForEffect(effect) {

    // match an effect
    const classEffect = classEffectArray.find(o => o.effect === effect)

    return classEffect ? classEffect.className : ""

}

// from effect to class
export function parseClassNameForEffect(eltClassName) {
    
    // classes as array
    var eltClasses = eltClassName.split(' ');

    for (const eltClass of eltClasses) {

        // try to match an existing class/effect
        const match = classEffectArray.find(ce => ce.className === eltClass)
        
        if(match){
            return match.effect
        }
    }

    return null;
}


export default CLASS_EFFECT