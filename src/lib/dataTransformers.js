/**
 * Centralized data transformation utilities
 * Converts API responses to the format expected by components
 */

/**
 * Transform sound data from new API format to component format
 * @param {Object} sound - Sound object from API
 * @returns {Object} Transformed sound object
 */
export const transformSoundData = (sound) => ({
  id: sound.id,
  name: sound.name,
  url: sound.url,
  description: sound.description,
  firebaseUid: sound.firebaseUid,
  isDeleted: sound.isDeleted,
  color: sound.color,
  favorites: sound.favorites,
  downloads: sound.downloads,
  favBy: sound.favBy || [], // Array of user IDs who favorited this sound
  created_at: {
    seconds: Math.floor(new Date(sound.createdAt).getTime() / 1000)
  },
  category: sound.categories?.map(cat => cat.name) || [],
  cat: sound.categories?.map(cat => cat.name) || []
});

/**
 * Transform array of sounds from API response
 * @param {Array} sounds - Array of sound objects from API
 * @returns {Array} Array of transformed sound objects
 */
export const transformSoundsArray = (sounds) => {
  return (sounds || []).map(transformSoundData);
};

/**
 * Get category display name from category value
 * @param {string} categoryValue - Category value (e.g., 'trending', 'funny_sound_effects')
 * @returns {string} Display name for the category
 */
export const getCategoryDisplayName = (categoryValue) => {
  const categoryMap = {
    'trending': 'Trending',
    'funny_sound_effects': 'Funny Sound Effects',
    'game_sound_effects': 'Game Sound Effects',
    'meme_soundboard': 'Meme Soundboard',
    'prank_soundboard': 'Prank Soundboard',
    'reaction_soundboard': 'Reaction Soundboard',
    'discord_soundboard': 'Discord Soundboard',
    'tiktok_sound_effects': 'TikTok Sound Effects',
    'youtube_sound_effects': 'YouTube Sound Effects',
    'anime_soundboard': 'Anime Soundboard',
    'movie_sound_effects': 'Movie Sound Effects',
    'nature_sound_effects': 'Nature Sound Effects',
    'animal_sound_effects': 'Animal Sound Effects',
    'birds_sound_effects': 'Birds Sound Effects',
    'human_sound_effects': 'Human Sound Effects',
    'horror_sound_effects': 'Horror Sound Effects',
    'sports_sound_effects': 'Sports Sound Effects',
    'transportation_sounds': 'Transportation Sounds',
    'royalty_free_music': 'Royalty Free Music',
    'free_sound_effects': 'Free Sound Effects',
    'just_added': 'Just Added'
  };
  
  return categoryMap[categoryValue] || categoryValue;
};

