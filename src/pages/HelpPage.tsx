export default function HelpPage() {
  const helpTopics = [
    {
      title: 'Getting Started',
      items: [
        'How to create an account',
        'Navigating the platform',
        'Watching videos',
        'Interacting with content',
      ],
    },
    {
      title: 'Account & Settings',
      items: [
        'Managing your account',
        'Privacy settings',
        'Notification preferences',
        'Connected accounts',
      ],
    },
    {
      title: 'Troubleshooting',
      items: [
        'Video playback issues',
        'Account access problems',
        'Mobile app support',
        'Known issues',
      ],
    },
  ];

  return (
    <div className="pt-16 pl-64">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Help Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic) => (
            <div key={topic.title} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">{topic.title}</h2>
              <ul className="space-y-2">
                {topic.items.map((item) => (
                  <li key={item}>
                    <button className="text-blue-600 hover:text-blue-800 text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}