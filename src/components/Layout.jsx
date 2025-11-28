import { SideBar } from './SideBar';

// Layout: componente que envuelve páginas con el sidebar
function Layout({ children }) {
    return (
        <div className="flex">
            {/* Sidebar fijo a la izquierda */}
            <SideBar />

            {/* Contenido principal */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}

export default Layout;