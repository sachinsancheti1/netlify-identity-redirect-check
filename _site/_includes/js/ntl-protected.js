const button1 = document.getElementById('left');
const button2 = document.getElementById('right');

const login = () => netlifyIdentity.open('login');
const signup = () => netlifyIdentity.open('signup');

// by default, we want to add login and signup functionality
button1.addEventListener('click', login);
button2.addEventListener('click', signup);

const updateUserInfo = (user) => {
  const container = document.querySelector('.user-info');

  // cloning the buttons removes existing event listeners
  const b1 = button1.cloneNode(true);
  const b2 = button2.cloneNode(true);

  // empty the user info div
  container.innerHTML = '';

  if (user) {
    const timeCheck =
      netlifyIdentity.currentUser().token.expires_at > new Date().getTime() ? false : true;
    if (timeCheck) {
      netlifyIdentity.refresh(); //.then((jwt)=>console.log(jwt))
      console.log('Welcome', user.user_metadata.full_name);
    }

    b1.innerText = 'Log Out';
    b1.addEventListener('click', () => {
      netlifyIdentity.logout();
    });

    b2.innerText = `Welcome ${user.user_metadata.full_name}, ${user.email}`;
    /*b2.addEventListener('click', () => {
      // TODO handle subscription management
      fetch('/.netlify/functions/idTest', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token.access_token}`,
        },
      })
        .then((res) => {res.json();
          console.log(res);
        })
        .then((link) => {
          window.location.href = link;
        })
        .catch((err) => console.error(err));
    });*/
  } else {
    // if no one is logged in, show login/signup options
    b1.innerText = 'Log In';
    b1.addEventListener('click', login);

    b2.innerText = 'Sign Up';
    b2.addEventListener('click', signup);

    netlifyIdentity.open();
  }

  // add the updated buttons back to the user info div
  container.appendChild(b1);
  container.appendChild(b2);
};

netlifyIdentity.on('init', updateUserInfo);
netlifyIdentity.on('login', updateUserInfo);
netlifyIdentity.on('logout', updateUserInfo);
netlifyIdentity.on('error', (err) => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));
