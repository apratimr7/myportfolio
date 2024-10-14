from fasthtml.common import *

app, rt = fast_app(live=True)


animation_script = Script(type="module", src = "assets/space_Back.js")

def get_head():
  script = Script("""
{
    "imports": {
       "three": 
    "https://cdn.jsdelivr.net/npm/three@0.167.1/build/three.module.js",
      "three/addons/": 
    "https://cdn.jsdelivr.net/npm/three@0.167.1/examples/jsm/"
            }
}""", type="importmap")
  return Head(Title("Apratim Rastogi"),
          Meta(charset="UTF-8"),
          Meta(name="viewport", content="width=device-width, initial-scale=1.0"),
          Link(href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css", rel='stylesheet'),
          Link(href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css", rel='stylesheet'),
          Link(href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css", rel='stylesheet'),
          Link(href="assets/style.css", rel='stylesheet'),script,
          )
  
  
def nav_bar():
    return Nav(
            Div(
                A(
                    Strong('Apratim Rastogi'),
                    href='/#home',
                    cls='navbar-item'
                ),
                A(
                    Span(aria_hidden='true'),
                    Span(aria_hidden='true'),
                    Span(aria_hidden='true'),
                    role='button',
                    aria_label='menu',
                    aria_expanded='false',
                    data_target='navbarMenu',
                    cls='navbar-burger'
                ),
                cls='navbar-brand'
            ),
            Div(
                Div(
                    A('About', href='/#about', cls='navbar-item'),
                    A('Projects', href='/#projects', cls='navbar-item'),
                    # A('Publications', href='#publications', cls='navbar-item'),
                    A('Education', href='/#education', cls='navbar-item'),
                    A('Skills', href='/#skills', cls='navbar-item'),
                    A('Contact', href='/#contact', cls='navbar-item'),
                    A('CV', href='/cv', target='_blank', cls='navbar-item'),
                    cls='navbar-end'
                ),
                id='navbarMenu',
                cls='navbar-menu'
            ),
            role='navigation',
            aria_label='main navigation',
            cls='navbar is-fixed-top'
        )


@app.get("/")
def home():
  return Html(
      get_head(),
      Body(
          Canvas(id="space-background"),
          Div(cls="progress-bar", id="scrollProgress"),
          nav_bar(),
        
        
        Div(
            Section(
                Div(
                    Div(
                        Div(
                            Div(
                                Div(
                                    Img(src='assets/prof_pic.jpg', alt='Profile', cls='profile-image mb-5'),
                                    cls='profile-container'
                                ),
                                H1('Apratim Rastogi', cls='title is-2 has-text-white mb-4'),
                                H2('Exploring the mysteries of universe one equation at a time', cls='subtitle is-4 has-text-white mb-5'),
                                # P(),
                                data_aos='fade-up',
                                cls='column is-half has-text-centered'
                            ),
                            cls='columns is-centered'
                        ),
                        cls='container'
                    ),
                    cls='hero-body'
                ),
                id='home',
                cls='hero is-fullheight'
            ),
            
            Section(
                Div(
                    H2('About Me', data_aos='fade-up', cls='title is-2 has-text-centered has-text-white section-title mb-6 glow-text'),
                    Div(
                        Div(
                            Div(
                                H3('Academic Journey', cls='title is-4 has-text-white mb-4'),
                                P("As an incoming graduate student in Computer Science, I am passionate about exploring the intersections of technology and innovation. My undergraduate experience has equipped me with a strong foundation in computer science fundamentals, and I'm excited to delve deeper into specialized areas during my graduate studies.", cls='has-text-white mb-4'),
                                Div(cls='divider'),
                                H3('Research Interests', cls='title is-4 has-text-white mb-4'),
                                Div(
                                    Span('Black Holes', cls='interest-tag'),
                                    Span('Quantum Gravity', cls='interest-tag'),
                                    Span('Holography', cls='interest-tag'),
                                    Span('AI in Physics', cls='interest-tag'),
                                    cls='mb-4'
                                ),
                                Div(
                                    H4('What Drives Me', cls='title is-5 has-text-white mb-3'),
                                    P("I am driven by the potential of technology to solve real-world problems and make a positive impact. My goal is to contribute to groundbreaking research that pushes the boundaries of what's possible in computer science.", cls='has-text-white'),
                                    cls='highlight-box'
                                ),
                                cls='about-card'
                            ),
                            data_aos='fade-right',
                            cls='column is-7'
                        ),
                        Div(
                            Div(
                                H3('Academic Highlights', cls='title is-4 has-text-white mb-4'),
                                Div(
                                    I(cls='fas fa-graduation-cap'),
                                    Div(
                                        H4("Bachelor's in Physics Hons with Philosophy minor", cls='title is-5 has-text-white mb-2'),
                                        P('Thapar Institute of Engineering and Technology, Graduated 2024', cls='has-text-white')
                                    ),
                                    cls='icon-box'
                                ),
                                Div(
                                    I(cls='fas fa-award'),
                                    Div(
                                        H4('Academic Achievement', cls='title is-5 has-text-white mb-2'),
                                        P("Third position all over BSc", cls='has-text-white')
                                    ),
                                    cls='icon-box'
                                ),
                                Div(
                                    I(cls='fas fa-code-branch'),
                                    Div(
                                        H4('Technical Skills', cls='title is-5 has-text-white mb-2'),
                                        P('Python, Julia, mathematical modelling', cls='has-text-white')
                                    ),
                                    cls='icon-box'
                                ),
                                Div(
                                    H4('Looking Forward', cls='title is-5 has-text-white mb-3'),
                                    P('Excited to begin my graduate studies and contribute to cutting-edge research in mathematical physics.', cls='has-text-white'),
                                    cls='highlight-box mt-4'
                                ),
                                cls='about-card'
                            ),
                            data_aos='fade-left',
                            cls='column is-5'
                        ),
                        cls='columns is-multiline'
                    ),
                    cls='container'
                ),
                id='about',
                cls='section'
            ),
            Section(
                Div(
                    H2('Projects', data_aos='fade-up', cls='title is-2 has-text-centered has-text-white section-title mb-6'),
                    Div(
                        Div(
                            Div(
                                # Figure(
                                #     Img(src='/api/placeholder/400/300', alt='Project 1'),
                                #     cls='image is-4by3'
                                # ),
                                Div(
                                    H3('Project Title 1', cls='title is-4 has-text-white mb-3'),
                                    P('Brief description of the project and your role in it.', cls='has-text-white'),
                                    cls='p-4'
                                ),
                                cls='project-card'
                            ),
                            data_aos='fade-up',
                            data_aos_delay='100',
                            cls='column is-4'
                        ),
                        cls='columns is-multiline'
                    ),
                    cls='container'
                ),
                id='projects'
            ),
            # Section(
            #     Div(
            #         H2('Publications', data_aos='fade-up', cls='title is-2 has-text-centered has-text-white section-title mb-6'),
            #         Div(
            #             Div(
            #                 Div(
            #                     H3('Publication Title 1', cls='title is-4 has-text-white mb-3'),
            #                     P('Authors, Journal/Conference, Year', cls='has-text-white mb-2'),
            #                     P('Brief description of the publication and its impact.', cls='has-text-white'),
            #                     data_aos='fade-left',
            #                     cls='timeline-item'
            #                 ),
            #                 cls='column is-8'
            #             ),
            #             cls='columns is-centered'
            #         ),
            #         cls='container'
            #     ),
            #     id='publications'
            # ),
            Section(
                Div(
                    H2('Education', data_aos='fade-up', cls='title is-2 has-text-centered has-text-white section-title mb-6'),
                    Div(
                        Div(
                            Div(
                                H3('University Name', cls='title is-4 has-text-white mb-3'),
                                P('Degree - Field of Study', cls='has-text-white mb-2'),
                                P('Year - Year', cls='has-text-white'),
                                data_aos='fade-right',
                                cls='timeline-item'
                            ),
                            cls='column is-8'
                        ),
                        cls='columns is-centered'
                    ),
                    cls='container'
                ),
                id='education'
            ),
            Section(
                Div(
                    H2('Skills', data_aos='fade-up', cls='title is-2 has-text-centered has-text-white section-title mb-6'),
                    Div(
                        Span('Python', data_aos='zoom-in', data_aos_delay='100', cls='skill-tag'),
                        Span('Machine Learning', data_aos='zoom-in', data_aos_delay='200', cls='skill-tag'),
                        Span('Data Analysis', data_aos='zoom-in', data_aos_delay='300', cls='skill-tag'),
                        cls='has-text-centered'
                    ),
                    cls='container'
                ),
                id='skills'
            ),
            Section(
                Div(
                    H2('Contact', data_aos='fade-up', cls='title is-2 has-text-centered has-text-white section-title mb-6'),
                    Div(
                        A(
                            I(cls='fas fa-envelope'),
                            href='mailto:your.email@example.com',
                            data_aos='fade-up',
                            data_aos_delay='100',
                            cls='social-icon'
                        ),
                        A(
                            I(cls='fab fa-linkedin'),
                            href='https://linkedin.com/in/yourprofile',
                            data_aos='fade-up',
                            data_aos_delay='200',
                            cls='social-icon'
                        ),
                        A(
                            I(cls='fab fa-github'),
                            href='https://github.com/yourusername',
                            data_aos='fade-up',
                            data_aos_delay='300',
                            cls='social-icon'
                        ),
                        cls='has-text-centered'
                    ),
                    cls='container'
                ),
                id='contact'
            ),
            cls='content-wrapper'
        ),
        Script(src='https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js'),
        Script("""document.addEventListener('DOMContentLoaded', () => {
          // Initialize AOS with enhanced settings
          AOS.init({
              duration: 1000,
              once: true,
              offset: 100,
              delay: 100,
              easing: 'ease-in-out'
          });

          // Navbar burger menu functionality
          const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
          if ($navbarBurgers.length > 0) {
              $navbarBurgers.forEach(el => {
                  el.addEventListener('click', () => {
                      const target = el.dataset.target;
                      const $target = document.getElementById(target);
                      el.classList.toggle('is-active');
                      $target.classList.toggle('is-active');
                  });
              });
          }

          // Enhanced smooth scrolling for anchor links
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  const targetElement = document.querySelector(targetId);
                  const navbarHeight = document.querySelector('.navbar').offsetHeight;
                  const targetPosition = targetElement.offsetTop - navbarHeight;
                  
                  window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                  });

                  // Update navbar items active state
                  document.querySelectorAll('.navbar-item').forEach(item => {
                      item.classList.remove('is-active');
                  });
                  this.classList.add('is-active');
              });
          });

          // Navbar background change and scroll progress on scroll
          const navbar = document.querySelector('.navbar');
          const scrollProgress = document.getElementById('scrollProgress');
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

          window.addEventListener('scroll', () => {
              // Navbar background change
              if (window.scrollY > 50) {
                  navbar.classList.add('is-scrolled');
              } else {
                  navbar.classList.remove('is-scrolled');
              }

              // Update scroll progress bar
              const scrolled = (window.scrollY / maxScroll) * 100;
              scrollProgress.style.width = `${scrolled}%`;
          });

          // Intersection Observer for section animations
          const sections = document.querySelectorAll('section');
          const observerOptions = {
              threshold: 0.2
          };

          const sectionObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.classList.add('section-visible');
                      updateActiveNavItem(entry.target.id);
                  }
              });
          }, observerOptions);

          sections.forEach(section => {
              sectionObserver.observe(section);
          });

          function updateActiveNavItem(sectionId) {
              document.querySelectorAll('.navbar-item').forEach(item => {
                  item.classList.remove('is-active');
                  if (item.getAttribute('href') === `#${sectionId}`) {
                      item.classList.add('is-active');
                  }
              });
          }

          // Parallax effect for profile image
          const profileImage = document.querySelector('.profile-image');
          window.addEventListener('mousemove', (e) => {
              const mouseX = e.clientX / window.innerWidth - 0.5;
              const mouseY = e.clientY / window.innerHeight - 0.5;
              
              profileImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
          });
      });"""),
          
          animation_script,
        ),
  )



#get CV.pdf
@rt("/cv")
def get():
#     script = Script("""
# {
#     "imports": {
#        "three": 
#     "https://cdn.jsdelivr.net/npm/three@0.167.1/build/three.module.js",
#       "three/addons/": 
#     "https://cdn.jsdelivr.net/npm/three@0.167.1/examples/jsm/"
#             }
# }""", type="importmap")
    return Html(get_head(),
    # Head(
    #     Meta(charset='UTF-8'),
    #     Meta(name='viewport', content='width=device-width, initial-scale=1.0'),
    #     Title('Apratim Rastogi - Curriculum Vitae'),
    #     Link(rel='stylesheet', href='https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css'),
    #     Link(rel='stylesheet', href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'),
    #     Link(rel='stylesheet', href='https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css'),
    #     Link(href="assets/style.css", rel='stylesheet'),script,
        
    # ),
    Body(
    Canvas(id='space-background'),
    Div(id='scrollProgress', cls='progress-bar'),
    nav_bar(),
    Section(
        Div(
            Div(
                H1('Curriculum Vitae', data_aos='fade-up', cls='title is-2 has-text-white section-title mb-4'),
                cls='has-text-centered mb-6'
            ),
            Div(
                H2('Profile Summary', cls='title is-3 has-text-white mb-4'),
                P('Recent graduate from Thapar Institute of Engineering and Technology with Physics (Hons) and Philosophy minor. My academic focus lies in the intersection of mathematical physics and theoretical concepts, with specific interests in black holes and quantum gravity. Complementing my physics background, my training in philosophy has sharpened my ability to think critically and solve complex problems with logic and rigor.', cls='mb-4 has-text-white'),
                data_aos='fade-up',
                cls='cv-section'
            ),
            Div(
                H2('Education', cls='title is-3 has-text-white mb-4'),
                Div(
                    H3('Thapar Institute of Engineering and Technology', cls='title is-4 has-text-white'),
                    P('Jul 2020 - Aug 2024', cls='subtitle is-6 has-text-white'),
                    P('Bachelor of Sciences in Physics(Hons) and minor in Philosophy', cls='mb-4 has-text-white'),
                    P('Final CGPA: 8.25/10', cls='has-text-primary'),
                    cls='timeline-item'
                ),
                Div(
                    H3('City Montessori School', cls='title is-4 has-text-white'),
                    P('Jul 2012 - Mar 2020', cls='subtitle is-6 has-text-white'),
                    P('12th grade: 85% in PCM and Computer Science', cls='mb-4 has-text-white'),
                    P('10th grade: 92%', cls='mb-4 has-text-white'),
                    cls='timeline-item'
                ),
                data_aos='fade-up',
                cls='cv-section'
            ),
            Div(
                H2('Skills', cls='title is-3 has-text-white mb-4'),
                Div(
                    H3('Languages', cls='title is-5 has-text-white mb-2'),#Span('Python', data_aos='zoom-in', data_aos_delay='100', cls='skill-tag')
                    Span('Python', cls='skill-tag'),
                    Span('C/C++', cls='skill-tag'),
                    Span('Julia', cls='skill-tag'),
                    Span('FORTRAN', cls='skill-tag'),
                    Span('LaTeX', cls='skill-tag'),
                    cls='mb-4 has-text-white container'
                ),
                Div(
                    H3('Tools', cls='title is-5 has-text-white mb-2'),
                    Span('GNU Plot', cls='skill-tag'),
                    Span('Matplotlib', cls='skill-tag'),
                    Span('SageMath', cls='skill-tag'),
                    Span('Tensorflow', cls='skill-tag'),
                    Span('Git/GitHub', cls='skill-tag'),
                    Span('Unix Shell', cls='skill-tag'),
                    Span('VS Code', cls='skill-tag'),
                    cls='mb-4 has-text-white container'
                ),
                data_aos='fade-up',
                cls='cv-section container'
            ),
            Div(
                H2('Projects', cls='title is-3 has-text-white mb-4'),
                Div(
                    H3('Event Horizon and Surface Presentism in classical GR', cls='title is-4 has-text-white'),
                    P('Jan 2024 - Ongoing', cls='subtitle is-6 has-text-white'),
                    P('We aim to defend surface presentism against the problems caused by Event Horizon as posed by a recent publication by Baron and Le Bihan 2023.'),
                    cls='timeline-item has-text-white'
                ),
                Div(
                    H3('Dissertation: Cavity Soliton Dynamics', cls='title is-4 has-text-white'),
                    P('Jan 2024 - Jul 2024', cls='subtitle is-6 has-text-white'),
                    P('Investigated the cavity soliton (CS) formation and its entrapment under central peak-shaped potentials inside a semiconductor laser cavity.'),
                    cls='timeline-item has-text-white'
                ),
                data_aos='fade-up',
                cls='cv-section'
            ),
            Div(
                H2('Honors and Awards', cls='title is-3 has-text-white mb-4'),
                Div(
                    H3('Third Position in University', cls='title is-4 has-text-white'),
                    P('Dec 2023', cls='subtitle is-6 has-text-white'),
                    P('Scored Third Position in University for BSc Honors (all subjects) for academic year 2022-23'),
                    cls='timeline-item has-text-white'
                ),
                Div(
                    H3('TSLAS merit-based Scholarship', cls='title is-4 has-text-white'),
                    P('Aug 2023', cls='subtitle is-6 has-text-white'),
                    P('Awarded 50% scholarship for academic performance based on Academic Years 2020 to 2023'),
                    cls='timeline-item has-text-white'
                ),
                data_aos='fade-up',
                cls='cv-section'
            ),
            cls='container'
        ),
        cls='section'
    ),
    A(
        I(cls='fas fa-download'),
        'Download CV',
        href='/CV.pdf',
        data_aos='fade-up',
        cls='floating-download-btn'
    ),
    Script(src='https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js'),
    Script("""
           document.addEventListener('DOMContentLoaded', () => {
            // Initialize AOS
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
            });

            // Navbar functionality
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
            if ($navbarBurgers.length > 0) {
                $navbarBurgers.forEach(el => {
                    el.addEventListener('click', () => {
                        const target = el.dataset.target;
                        const $target = document.getElementById(target);
                        el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                    });
                });
            }
            window.addEventListener('beforeunload', cleanup);

            // Navbar scroll behavior
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('is-scrolled');
                } else {
                    navbar.classList.remove('is-scrolled');
                }
            });
        });"""),
    animation_script,
),
    lang='en'
)
    
@app.get("/CV.pdf")
def cvpdf():
    return FileResponse(f'assets/CV.pdf')

@rt("/assets/{file}")
async def get(file:str): 
    return FileResponse(f'assets/{file}')

@rt("/assets/models/{file}")
async def get(file:str): 
    return FileResponse(f'assets/models/{file}')

@rt("/assets/models/Planets/{file}")
async def get(file:str): 
    return FileResponse(f'assets/models/Planets/{file}')
# server
serve()