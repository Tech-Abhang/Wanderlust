# Wanderhub

![Wanderhub Logo](https://img.shields.io/badge/Wanderhub-Travel%20Listings-brightgreen)

Wanderhub is a full-stack web application that allows users to discover, review, and list travel accommodations worldwide. Whether you're looking for a cozy beach cottage, a mountain retreat, or a luxury penthouse, Wanderhub provides an intuitive platform to connect travelers with unique places to stay.

## 📋 Features

- **Browse Listings**: View a collection of properties with images, descriptions, and pricing
- **Detailed Listings**: Get comprehensive information about each property
- **Create Listings**: Add new accommodations to the platform
- **Review System**: Read and leave reviews to help fellow travelers
- **User-friendly Interface**: Intuitive navigation and responsive design
- **Dark Mode**: Toggle between light and dark themes for comfortable browsing

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **EJS** - Templating engine
- **Express Session** - Session management
- **Connect Flash** - Flash message middleware
- **Joi** - Data validation

### Frontend
- **HTML5/CSS3** - Structure and styling
- **Bootstrap 5** - Responsive design framework
- **JavaScript** - Client-side functionality
- **Font Awesome** - Icon toolkit

## 📦 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderhub.git
   cd wanderhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install and Set Up MongoDB**
   
   ### macOS
   
   **Using Homebrew:**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install MongoDB Community Edition
   brew tap mongodb/brew
   brew install mongodb-community@6.0
   
   # Start MongoDB service
   brew services start mongodb-community@6.0
   ```
   
   ### Windows
   
   1. Download the MongoDB Community Server installer from the [MongoDB website](https://www.mongodb.com/try/download/community)
   2. Run the installer and follow the installation wizard
   3. Choose "Complete" installation
   4. Check the option "Install MongoDB as a Service"
   5. Complete the installation
   
   ### Linux (Ubuntu/Debian)
   
   ```bash
   # Import MongoDB public GPG key
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   
   # Create list file for MongoDB
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   
   # Reload local package database
   sudo apt-get update
   
   # Install MongoDB packages
   sudo apt-get install -y mongodb-org
   
   # Start MongoDB service
   sudo systemctl start mongod
   
   # Enable MongoDB to start on system boot
   sudo systemctl enable mongod
   ```
   
   ### Linux (RHEL/CentOS/Fedora)
   
   ```bash
   # Create a .repo file for MongoDB
   sudo tee /etc/yum.repos.d/mongodb-org-6.0.repo << EOF
   [mongodb-org-6.0]
   name=MongoDB Repository
   baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/6.0/x86_64/
   gpgcheck=1
   enabled=1
   gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc
   EOF
   
   # Install MongoDB packages
   sudo yum install -y mongodb-org
   
   # Start MongoDB service
   sudo systemctl start mongod
   
   # Enable MongoDB to start on system boot
   sudo systemctl enable mongod
   ```
   
   ### Linux (Arch Linux)
   
   ```bash
   # Install MongoDB from the AUR
   git clone https://aur.archlinux.org/mongodb-bin.git
   cd mongodb-bin
   makepkg -si
   
   # Start and enable MongoDB service
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```
   
   ### Verify installation
   
   ```bash
   # Connect to MongoDB
   mongosh
   ```
   
   If MongoDB is running correctly, you should see the MongoDB shell prompt. Type `exit` to return to your regular shell.
   
   ### Create database
   
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Create and switch to wanderlust database
   use wanderlust
   
   # Exit MongoDB shell
   exit
   ```

4. **Seed the database (optional)**
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Access the application**
   Open your browser and visit `http://localhost:8080`

## 🔍 Usage

### Browsing Listings
Navigate to the home page to view all available listings. Click on any listing to see detailed information.

### Creating a New Listing
1. Click on "Add New" in the navigation bar
2. Fill in the required details (title, description, location, etc.)
3. Submit the form to create your listing

### Adding Reviews
1. Navigate to a specific listing
2. Scroll down to the "Leave a message" section
3. Rate the listing and add your comments
4. Submit the review

### Using Dark Mode
Click the moon icon in the navigation bar to toggle between light and dark modes.

## 🔄 API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Form to create a new listing
- `POST /listings` - Create a new listing
- `GET /listings/:id` - View a specific listing
- `GET /listings/:id/edit` - Form to edit a listing
- `PUT /listings/:id` - Update a specific listing
- `DELETE /listings/:id` - Delete a specific listing

### Reviews
- `POST /listings/:id/reviews` - Create a review for a specific listing

## 👥 Contributing

Contributions are welcome! If you'd like to improve Wanderhub, please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request