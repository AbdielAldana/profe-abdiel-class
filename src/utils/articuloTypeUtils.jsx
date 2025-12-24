// React Icons (GI)
import {
    GiBookAura,
    GiBookPile,
    GiBookmarklet,
    GiBroadsword,
    GiChickenLeg,
    GiEdgedShield,
    GiElfHelmet,
    GiExtraTime,
    GiGemPendant,
    GiHealthPotion,
    GiHeavyTimer,
    GiLightningBow,
    GiMagicPotion,
    GiPotionBall,
    GiPotionOfMadness,
    GiSandsOfTime,
    GiScrollQuill,
    GiSmartphone,
    GiSpade,
    GiSpearHook,
    GiSpellBook,
    GiSwordsPower,
    GiTiedScroll,
    GiWinterGloves,
    GiWizardStaff,
    GiWoodAxe,
} from "react-icons/gi";

const ICON_MAP = {
    GiBookAura,
    GiBookPile,
    GiBookmarklet,
    GiBroadsword,
    GiChickenLeg,
    GiEdgedShield,
    GiElfHelmet,
    GiExtraTime,
    GiGemPendant,
    GiHealthPotion,
    GiHeavyTimer,
    GiLightningBow,
    GiMagicPotion,
    GiPotionBall,
    GiPotionOfMadness,
    GiSandsOfTime,
    GiScrollQuill,
    GiSmartphone,
    GiSpade,
    GiSpearHook,
    GiSpellBook,
    GiSwordsPower,
    GiTiedScroll,
    GiWinterGloves,
    GiWizardStaff,
    GiWoodAxe,
};

export const IconArt = (c, color) => {
    const IconComp = ICON_MAP[c];
    return (<IconComp size={50} style={{ color: ViewType(color).color }} />)
}

export const ViewType = (c) => {
    let temp = { color: "#fff" };

    if (c == 0) {
        temp.color = "#4CAF50";        
    } else if (c == 1) {
        temp.color = "#2196F3";
    } else if (c == 2) {
        temp.color = "#9C27B0";        
    } else if (c == 3) {
        temp.color = "#FF9800";        
    }

    return temp;
};


export const claseName = (x) => {
    let tempClase = ""
    switch (x) {
        case "0":
            tempClase = "Comun"
            break;
        case "1":
            tempClase = "Raro"
            break;
        case "2":
            tempClase = "Epico"
            break;
        case "3":
            tempClase = "Legendario"
            break;
    
        default:
            break;
    }
    return (tempClase)
}


export const getTiempoRestante = (fechaFinGlobal) => {
    const fin = new Date(fechaFinGlobal.replace(" ", "T")).getTime();
    const ahora = Date.now();
    const diff = fin - ahora;

    if (diff <= 0) return "Vencida";

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
};

