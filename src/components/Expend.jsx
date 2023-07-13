// Function/Helpers
import { reFormatDate } from "../helpers";

// Dependencias
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import 'react-swipeable-list/dist/styles.css'

// SVG
import AhorroIcon from '../img/icono_ahorro.svg';
import ComidaIcon from '../img/icono_comida.svg';
import CasaIcon from '../img/icono_casa.svg';
import GastosIcon from '../img/icono_gastos.svg';
import OcioIcon from '../img/icono_ocio.svg';
import SaludIcon from '../img/icono_salud.svg';
import SusbcripcionesIcon from '../img/icono_suscripciones.svg';

const diccionarioIcons = {
    ahorro: AhorroIcon,
    comida: ComidaIcon,
    casa: CasaIcon,
    varios: GastosIcon,
    hobbies: OcioIcon,
    salud: SaludIcon,
    subscribciones: SusbcripcionesIcon
}

const Expend = ({expend, setEditExpend, deleteExpend}) => {

    const { amount, name, category, id, date } = expend;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => setEditExpend(expend)}
            >
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions className="swipe-action__trailing">
            <SwipeAction
                onClick={() => deleteExpend(expend.id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img 
                            src={diccionarioIcons[category]} 
                            alt="Icono referente a la categoria del gasto" 
                        />

                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{name}</p>
                            <p className="fecha-gasto">Agregado en: <span>{reFormatDate(date)}</span></p>
                        </div>
                    </div>
                        <p className="cantidad-gasto">${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expend;