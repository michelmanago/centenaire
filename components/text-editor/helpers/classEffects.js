const CLASS_EFFECT = {

    // Images
    imgFloatLeft: {
        className: "page__imgfloatleft",
        effect: "img-float-left"
    },

    imgFloatCenter: {
        className: "page__imgaligncenter",
        effect: "img-align-center"
    },

    imgFloatRight: {
        className: "page__imgfloatright",
        effect: "img-float-right"
    },

    // Paragraph
    alignLeft: {
        className: "text-left",
        effect: "align-left",
    },

    alignLeft: {
        className: "text-right",
        effect: "align-right",
    },

    alignCenter: {
        className: "text-center",
        effect: "align-center",
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