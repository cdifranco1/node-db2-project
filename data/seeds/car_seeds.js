
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(() => {
      return knex('cars').insert([
          {vin: '7890183',
          make: 'jeep',
          model: 'grand cherokee',
          transmission: 'automatic',
          title: 'salvage'}
      ]);
    })
};
