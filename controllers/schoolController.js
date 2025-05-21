const db = require('../db');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate inputs
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Invalid input. All fields are required.' });
  }

  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  
  try {
    const [result] = await db.query(sql, [name, address, latitude, longitude]);
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (err) {
    console.error('Error inserting school:', err);
    res.status(500).json({ message: 'Database error' });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Latitude and longitude are required and must be valid numbers.' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  try {
    const [results] = await db.query('SELECT * FROM schools');

    const toRad = (value) => (value * Math.PI) / 180;

    const schoolsWithDistance = results.map(school => {
      const dLat = toRad(school.latitude - userLat);
      const dLon = toRad(school.longitude - userLon);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(userLat)) * Math.cos(toRad(school.latitude)) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c; // Radius of Earth in km

      return { ...school, distance: parseFloat(distance.toFixed(2)) };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  } catch (err) {
    console.error('Error fetching schools:', err);
    res.status(500).json({ message: 'Database error' });
  }
};
