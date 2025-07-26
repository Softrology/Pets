import React, { useState } from 'react';
import { 
  Search, Calendar, User, Clock, ArrowRight, Tag,
  Heart, Stethoscope, Shield, Award, TrendingUp,
  ChevronRight, Eye, Filter
} from 'lucide-react';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const categories = [
    'All Posts',
    'Pet Health',
    'Nutrition',
    'Training',
    'Emergency Care',
    'Preventive Care',
    'Senior Pets',
    'Puppies & Kittens'
  ];

  const featuredPost = {
    id: 1,
    title: '10 Essential Tips for First-Time Pet Owners',
    excerpt: 'Bringing home your first pet is an exciting milestone. Here are the essential tips every new pet owner should know to ensure their furry friend stays healthy and happy.',
    author: 'Dr. Sarah Paws',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Pet Health',
    image: 'featured-blog-placeholder',
    views: 2847,
    likes: 156,
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: 'Understanding Your Cat\'s Behavior: Signs of Stress',
      excerpt: 'Learn to recognize the subtle signs that indicate your cat might be experiencing stress and what you can do to help them feel more comfortable.',
      author: 'Dr. Michael Whiskers',
      date: '2025-01-12',
      readTime: '6 min read',
      category: 'Pet Health',
      image: 'blog-2-placeholder',
      views: 1923,
      likes: 89
    },
    {
      id: 3,
      title: 'The Ultimate Guide to Dog Nutrition',
      excerpt: 'Everything you need to know about feeding your dog properly, from puppyhood to their senior years. Includes feeding schedules and recommended foods.',
      author: 'Dr. Emily Petpulse',
      date: '2025-01-10',
      readTime: '12 min read',
      category: 'Nutrition',
      image: 'blog-3-placeholder',
      views: 3156,
      likes: 234
    },
    {
      id: 4,
      title: 'Emergency Care: What to Do When Your Pet is Injured',
      excerpt: 'Quick response guide for pet emergencies. Learn the immediate steps to take before rushing to the veterinary clinic.',
      author: 'Dr. James Furry',
      date: '2025-01-08',
      readTime: '10 min read',
      category: 'Emergency Care',
      image: 'blog-4-placeholder',
      views: 2678,
      likes: 187
    },
    {
      id: 5,
      title: 'Vaccination Schedule: Keeping Your Pet Protected',
      excerpt: 'A comprehensive guide to pet vaccinations, including which vaccines are essential and when to schedule them.',
      author: 'Dr. Lisa Canine',
      date: '2025-01-05',
      readTime: '7 min read',
      category: 'Preventive Care',
      image: 'blog-5-placeholder',
      views: 1845,
      likes: 123
    },
    {
      id: 6,
      title: 'Senior Pet Care: Keeping Older Pets Comfortable',
      excerpt: 'As pets age, their needs change. Learn how to adapt your care routine to keep your senior pet healthy and comfortable.',
      author: 'Dr. Robert Dental',
      date: '2025-01-03',
      readTime: '9 min read',
      category: 'Senior Pets',
      image: 'blog-6-placeholder',
      views: 2234,
      likes: 167
    },
    {
      id: 7,
      title: 'Training Your Puppy: Basic Commands Every Dog Should Know',
      excerpt: 'Start your puppy\'s training journey with these essential commands. Building a strong foundation early makes training easier.',
      author: 'Dr. Sarah Paws',
      date: '2025-01-01',
      readTime: '11 min read',
      category: 'Training',
      image: 'blog-7-placeholder',
      views: 2987,
      likes: 198
    },
    {
      id: 8,
      title: 'Dental Health: Why Your Pet\'s Teeth Matter',
      excerpt: 'Dental problems can lead to serious health issues. Learn how to maintain your pet\'s oral health and recognize warning signs.',
      author: 'Dr. Michael Whiskers',
      date: '2024-12-28',
      readTime: '8 min read',
      category: 'Pet Health',
      image: 'blog-8-placeholder',
      views: 1756,
      likes: 134
    },
    {
      id: 9,
      title: 'Creating a Safe Environment for Indoor Cats',
      excerpt: 'Tips for cat-proofing your home and creating an enriching environment that keeps indoor cats happy and stimulated.',
      author: 'Dr. Emily Petpulse',
      date: '2024-12-25',
      readTime: '6 min read',
      category: 'Pet Health',
      image: 'blog-9-placeholder',
      views: 2145,
      likes: 156
    }
  ];

  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  const handleSearch = () => {
    let filtered = blogPosts;

    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All Posts') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  };

  const popularTags = [
    'Pet Health', 'Nutrition', 'Training', 'Emergency', 'Vaccination',
    'Senior Care', 'Puppies', 'Cats', 'Dogs', 'Preventive Care'
  ];

  const recentPosts = blogPosts.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Pet Care <span className="text-teal-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice, tips, and insights to help you provide the best care for your beloved pets.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Article</h2>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Featured Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                    <div className="text-center">
                      <Heart className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                      <p className="text-teal-700 font-semibold">Featured Article Image</p>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-500 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{featuredPost.author}</p>
                          <p className="text-gray-500 text-sm flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500 text-sm flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {featuredPost.views.toLocaleString()} views
                        </span>
                        <span className="text-gray-500 text-sm flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {featuredPost.likes.toLocaleString()} likes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* All Articles */}
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
                  <div className="flex items-center">
                    <Filter className="w-5 h-5 text-gray-500 mr-2" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        handleSearch();
                      }}
                      className="bg-transparent border-0 text-gray-600 focus:ring-0 focus:border-gray-300"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map(post => (
                    <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {/* Blog Image Placeholder */}
                      <div className="aspect-video bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                        <div className="text-center">
                          <Heart className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                          <p className="text-teal-600 font-medium">Blog Image</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {post.category}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-gray-500 text-sm flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2">
                              <User className="w-4 h-4 text-teal-600" />
                            </div>
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center">
                            Read more <ArrowRight className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No articles found</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Try adjusting your search or filter criteria to find what you're looking for.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                      Previous
                    </a>
                    <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-white text-teal-600 font-medium">
                      1
                    </a>
                    <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                      2
                    </a>
                    <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                      3
                    </a>
                    <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                      Next
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* About Widget */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">About The Blog</h3>
                <div className="aspect-square bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-12 h-12 text-teal-600" />
                </div>
                <p className="text-gray-600 mb-4">
                  Our veterinary experts share their knowledge to help you take better care of your pets.
                </p>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Learn More
                </button>
              </div>

              {/* Categories Widget */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.filter(cat => cat !== 'All Posts').map(category => (
                    <li key={category}>
                      <a 
                        href="#" 
                        className={`flex items-center justify-between py-2 px-3 rounded-lg transition-colors ${selectedCategory === category ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory(category);
                          handleSearch();
                        }}
                      >
                        <span>{category}</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Tags Widget */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <a 
                      key={tag} 
                      href="#"
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Posts</h3>
                <ul className="space-y-4">
                  {recentPosts.map(post => (
                    <li key={post.id}>
                      <a href="#" className="group flex items-start space-x-3">
                        <div className="flex-shrink-0 w-16 h-16 bg-teal-50 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-teal-600">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Subscribe to Newsletter</h3>
                <p className="text-teal-100 mb-4">
                  Get the latest pet care tips and updates directly to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-teal-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-teal-600 hover:bg-gray-100 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;