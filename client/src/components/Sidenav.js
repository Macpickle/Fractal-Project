function SideNav({filterComponent}) {
    return (
        <nav className="sidenav mt-3 col-md-2 col-sm-1 d-none d-md-block">
            {filterComponent}
        </nav>
    );
}

export default SideNav;