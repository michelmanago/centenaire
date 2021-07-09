const iconWidth = 16;
const iconHeight = 16;

export const Bold = ({isActive}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isActive ? 'fill-black' : 'fill-grey'}
            width={iconWidth}
            height={iconHeight}
            viewBox="0 0 20 20"
        >
            <path d="M3 19V1h8a5 5 0 0 1 3.88 8.16A5.5 5.5 0 0 1 11.5 19H3zm7.5-8H7v5h3.5a2.5 2.5 0 1 0 0-5zM7 4v4h3a2 2 0 1 0 0-4H7z" />
        </svg>
    );
};

export const Italic = ({isActive}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isActive ? 'fill-black' : 'fill-grey'}
            width={iconWidth}
            height={iconHeight}
            viewBox="0 0 20 20"
        >
            <path d="M8 1h9v2H8V1zm3 2h3L8 17H5l6-14zM2 17h9v2H2v-2z" />
        </svg>
    );
};

export const Underline = ({isActive}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isActive ? 'fill-black' : 'fill-grey'}
            width={iconWidth}
            height={iconHeight}
            viewBox="0 -4 20 23"
        >
            <path d="M16 9A6 6 0 1 1 4 9V1h3v8a3 3 0 0 0 6 0V1h3v8zM2 17h16v2H2v-2z" />
        </svg>
    );
};

export const Strikethrough = ({isActive}) => {
    let myStyle2 = {fontSize: '1.6rem', fontFamily: 'Montserrat', fontWeight: 500};
    return (
        <svg
            className={isActive ? 'fill-black' : 'fill-grey'}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 20 20"
        >
            <text x="2" y="20" style={myStyle2}>
                S
            </text>
            <line x1="0" y1="12" x2="20" y2="11" strokeWidth="2" stroke={isActive ? 'black' : 'grey'} />
        </svg>
    );
};

export const ListBulleted = ({isActive}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 60 60">
            <circle cx="10" cy="18" r="6" fill="black" />
            <circle cx="10" cy="36" r="6" fill="black" />
            <circle cx="10" cy="54" r="6" fill="black" />
            <line x1="25" y1="18" x2="65" y2="18" strokeWidth="5" stroke="black" />
            <line x1="25" y1="36" x2="65" y2="36" strokeWidth="5" stroke="black" />
            <line x1="25" y1="54" x2="65" y2="54" strokeWidth="5" stroke="black" />
        </svg>
    );
};

export const ListNumbered = ({isActive}) => {
    let myStyle = {fontFamily: 'Montserrat', fontWeight: 600};
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={iconWidth} height={iconHeight} viewBox="0 0 60 60">
            <text x="10" y="24" style={myStyle}>
                1
            </text>
            <text x="9" y="42" style={myStyle}>
                2
            </text>
            <text x="9" y="60" style={myStyle}>
                3
            </text>
            <line x1="25" y1="20" x2="65" y2="20" strokeWidth="5" stroke="black" />
            <line x1="25" y1="38" x2="65" y2="38" strokeWidth="5" stroke="black" />
            <line x1="25" y1="54" x2="65" y2="54" strokeWidth="5" stroke="black" />
        </svg>
    );
};

export const Link = ({isActive}) => {
    return (
        <svg
            className={isActive ? 'fill-black' : 'fill-grey'}
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={17}
        >
            <path d="M9.26 13a2 2 0 0 1 .01-2.01A3 3 0 0 0 9 5H5a3 3 0 0 0 0 6h.08a6.06 6.06 0 0 0 0 2H5A5 5 0 0 1 5 3h4a5 5 0 0 1 .26 10zm1.48-6a2 2 0 0 1-.01 2.01A3 3 0 0 0 11 15h4a3 3 0 0 0 0-6h-.08a6.06 6.06 0 0 0 0-2H15a5 5 0 0 1 0 10h-4a5 5 0 0 1-.26-10z" />
        </svg>
    );
};

export const Image = ({isActive}) => {
    return (
        <svg
            className={isActive ? 'fill-black' : 'fill-grey'}
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 52 52"
        >
            <path
                d="M14,24.138c3.071,0,5.569-2.498,5.569-5.568C19.569,15.498,17.071,13,14,13s-5.569,2.498-5.569,5.569
								C8.431,21.64,10.929,24.138,14,24.138z M14,15c1.968,0,3.569,1.602,3.569,3.569S15.968,22.138,14,22.138s-3.569-1.601-3.569-3.568
								S12.032,15,14,15z"
            />
            <path
                d="M1,0v40v12h50V40V0H1z M3,2h46v26.727l-10.324-9.464c-0.196-0.179-0.454-0.268-0.72-0.262
								c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743c-0.374-0.373-0.972-0.392-1.368-0.044L4.622,40H3V2z M49,50H3
								v-8h46V50z M7.649,40l14.324-12.611l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414l-4.807-4.807l9.181-10.054
								L49,31.44V40H7.649z"
            />
        </svg>
    );
};

export const Video = ({isActive}) => {
    return (
        <svg
            className={isActive ? 'fill-black' : 'fill-grey'}
            xmlns="http://www.w3.org/2000/svg"
            width={iconWidth}
            height={iconHeight}
            x="0px"
            y="0px"
            viewBox="0 0 60 60"
        >
            <path
                d="M36.537,28.156l-11-7c-0.308-0.195-0.698-0.208-1.019-0.033C24.199,21.299,24,21.635,24,22v14
            c0,0.365,0.199,0.701,0.519,0.877C24.669,36.959,24.834,37,25,37c0.187,0,0.374-0.053,0.537-0.156l11-7
            C36.825,29.66,37,29.342,37,29S36.825,28.34,36.537,28.156z M26,34.179V23.821L34.137,29L26,34.179z"
            />
            <path
                d="M57,6H47H11H1C0.448,6,0,6.447,0,7v11v11v11v11c0,0.553,0.448,1,1,1h10h36h10c0.552,0,1-0.447,1-1V40V29V18V7
            C58,6.447,57.552,6,57,6z M10,28H2v-9h8V28z M2,30h8v9H2V30z M12,40V29V18V8h34v10v11v11v10H12V40z M56,28h-8v-9h8V28z M48,30h8v9
            h-8V30z M56,8v9h-8V8H56z M2,8h8v9H2V8z M2,50v-9h8v9H2z M56,50h-8v-9h8V50z"
            />
        </svg>
    );
};

export const Music = ({isActive}) => {
    return (
        <svg
            className={isActive ? 'fill-black' : 'fill-grey'}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-music"
            viewBox="0 0 24 24"
        >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
        </svg>
    );
};

export const PDF = ({isActive}) => {
    return (
        <svg
            className={isActive ? 'fill-black' : 'fill-grey'}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
        >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
    );
};

export const AlignLeft = ({isActive}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isActive ? 'fill-black' : 'fill-grey'}
            width={iconWidth}
            height={iconHeight}
            viewBox="0 -1 20 20"
        >
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h12v2H1V5zm0 8h12v2H1v-2z" />
        </svg>
    );
};

export const AlignCenter = ({isActive}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isActive ? 'fill-black' : 'fill-grey'}
            width={iconWidth}
            height={iconHeight}
            viewBox="0 -1 20 20"
        >
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM4 5h12v2H4V5zm0 8h12v2H4v-2z" />
        </svg>
    );
};

export const AlignRight = ({isActive}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isActive ? 'fill-black' : 'fill-grey'}
            width={iconWidth}
            height={iconHeight}
            viewBox="0 -1 20 20"
        >
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM7 5h12v2H7V5zm0 8h12v2H7v-2z" />
        </svg>
    );
};

export const AlignJustify = ({isActive}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isActive ? 'fill-black' : 'fill-grey'}
            width={iconWidth}
            height={iconHeight}
            viewBox="0 -1 20 20"
        >
            <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h18v2H1V5zm0 8h18v2H1v-2z" />
        </svg>
    );
};
