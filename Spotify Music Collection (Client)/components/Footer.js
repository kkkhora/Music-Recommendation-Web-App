const Footer = () => {
    return (
        <div>
            <footer className="footer-section">
            <div className="footer-top" style={{backgroundImage:"url('assets/images/footer/footer_logo.png')"}}>
                <div className="footer-links padding-top padding-bottom">
                <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <div className="footer-link-item">
                                    <h5>About Us</h5>
                                    <ul className="footer-link-list">
                                        <li><a className="footer-link">Team: 404 NOT FOUND</a></li>
                                        <li><a href="/developers" className="footer-link">Developers Details</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p className="text-center py-4 mb-0"> Design By: Team 404 NOT FOUND
                    </p>
                </div>
            </div>
        </footer>

        <a href="#" className="scrollToTop"><i className="icofont-swoosh-up"></i></a>
        </div>
    )
}

export default Footer