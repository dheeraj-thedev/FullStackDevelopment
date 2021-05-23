import React from "react" 
import  "./Home.css"
function Home(){
    return(<div>
        <Header></Header>
        <section>
            <NavBar></NavBar>
            <article>
                <h1>My Contenet Area</h1>
                        <p  >dasjdhasjdhas</p>
            </article>
        </section>
        <Footer></Footer>
        </div>)
}

function Header (){
    return(<header>
        <h2>My Logo : Cities</h2>
    </header>)
}

function NavBar (){
    return (<div>
                <nav>
                    <ul>
                        <li><a href="#">London</a> </li>
                        <li><a href="#">Paris</a> </li>
                        <li><a href="#">Tokyo</a> </li>
                    </ul>
                </nav>
            </div>)
            }

            function Footer(){
                return (<footer><p>Footer area</p></footer>)
            }
export default Home;