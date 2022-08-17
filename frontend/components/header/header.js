import h, { navigate } from "../../core/index.js";




export default function Header(props) {
    const hide = props && props.hide;

    let sg = props && (props.userName || '');
    sg = sg.split(' ');
    sg = sg[0] ? (sg[1] ? `${sg[0][0]}${sg[1][0]}` : sg[0][0]) : '...';

    const links = [
        { path: '/', name: 'Atendimentos', ref: 'attendances' },
        { path: '/t2', name: 'Painel de controle', ref: 'controlPainel' }
    ]

    return (
        <header class="header">
            {/* !hide && <img class="logo-header" onClick={() => navigate('/')} src={logoTitle} alt="logo" /> */}

            {!hide &&
                <div style="display: flex; align-items:center">
                    <nav class="up-nav" >
                        {links.map(el => (<a link-to href={el.path} class={props.ref === el.ref ? 'active' : ''}>{el.name}</a>))}
                    </nav>
                    <span class="span-header">
                        {props.photo ? <img class="img-profile" src="/api/file/avatar/get/3" alt="..." /> : <span>{sg}</span>}
                    </span>
                </div>
            }
        </header>
    );
};
