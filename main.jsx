function useAuth() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const identity = window.netlifyIdentity;

    identity.on('init', user => {
      setUser(user);
      setLoading(false);
    });

    identity.on('login', user => {
      setUser(user);
      identity.close();
    });

    identity.on('logout', () => setUser(null));

    identity.init();

    return () => {
      identity.off('init');
      identity.off('login');
      identity.off('logout');
    };
  }, []);

  const login = () => window.netlifyIdentity.open();
  const logout = () => window.netlifyIdentity.logout();

  return { user, loading, login, logout };
}

function App() {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return <div className="text-center text-xl">טוען...</div>;
  }

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl mb-4">אנא התחבר לאפליקציה</h2>
        <button onClick={login} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          התחבר
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl mb-4">ברוך הבא, {user.user_metadata.full_name || user.email}</h2>
      <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
        התנתק
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
