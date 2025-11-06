# API Setup Documentation

This directory contains all the API-related configuration and utilities for the Sound Effect Buttons application.

## Files Overview

### Core API Files
- `api.js` - Axios instance configuration with interceptors
- `apiServices.js` - All API service functions organized by resource type
- `apiConfig.js` - API configuration constants and error handling
- `apiUtils.js` - Utility functions for API operations
- `config.js` - Application configuration including API settings

### Hooks
- `hooks/useApi.js` - Custom React hooks for API calls with loading states

## Usage Examples

### Basic API Call
```javascript
import { soundsAPI } from '@/lib';

// Get all sounds
const response = await soundsAPI.getAllSounds();
if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}
```

### Using React Hooks
```javascript
import { useApiOnMount, soundsAPI } from '@/lib';

function SoundsList() {
  const { data, loading, error, refetch } = useApiOnMount(soundsAPI.getAllSounds);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map(sound => (
        <div key={sound.id}>{sound.name}</div>
      ))}
    </div>
  );
}
```

### Paginated Data
```javascript
import { usePaginatedApi, soundsAPI } from '@/lib';

function PaginatedSounds() {
  const { data, loading, hasMore, loadMore } = usePaginatedApi(soundsAPI.getAllSounds);
  
  return (
    <div>
      {data?.map(sound => (
        <div key={sound.id}>{sound.name}</div>
      ))}
      {hasMore && (
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      )}
    </div>
  );
}
```

### Error Handling
```javascript
import { apiCall, soundsAPI } from '@/lib';

async function handleGetSounds() {
  const result = await apiCall(soundsAPI.getAllSounds);
  
  if (result.success) {
    // Handle success
    console.log(result.data);
  } else {
    // Handle error
    console.error(result.error.message);
  }
}
```

## API Endpoints

The API service includes functions for all endpoints shown in the Swagger documentation:

### Sounds
- `getAllSounds()` - GET /sounds
- `getSoundsGroupedByCategory()` - GET /sounds/grouped-by-category
- `getTopUsers()` - GET /sounds/top-users
- `getSoundsByUser(userId)` - GET /sounds/user/{id}
- `getSoundsByCategory(categoryName)` - GET /sounds/{categoryName}
- `getCategories()` - GET /sounds/categories
- `getTags()` - GET /sounds/tags
- `getTrendingSounds()` - GET /sounds/trending
- `getJustAddedSounds()` - GET /sounds/just-added
- `getSoundById(soundId)` - GET /sounds/{id}
- `createSound(soundData)` - POST /sounds
- `createSoundInCategory(categoryName, soundData)` - POST /sounds/{categoryName}
- `updateSound(soundId, soundData)` - PUT /sounds/{id}
- `deleteSound(soundId)` - DELETE /sounds/{id}
- `hardDeleteSound(soundId)` - DELETE /sounds/{id}/hard
- `incrementDownload(soundId)` - POST /sounds/{id}/increment-download
- `toggleFavorite(soundId)` - POST /sounds/{id}/toggle-favorite
- `searchSounds(query, params)` - GET /sounds/search

### Users
- `getUserById(userId)` - GET /users/{id}
- `updateUser(userId, userData)` - PUT /users/{id}
- `getUserSounds(userId)` - GET /users/{id}/sounds
- `getUserFavorites(userId)` - GET /users/{id}/favorites

### Categories
- `getAllCategories()` - GET /categories
- `createCategory(categoryData)` - POST /categories
- `updateCategory(categoryId, categoryData)` - PUT /categories/{id}
- `deleteCategory(categoryId)` - DELETE /categories/{id}

### Tags
- `getAllTags()` - GET /tags
- `createTag(tagData)` - POST /tags
- `updateTag(tagId, tagData)` - PUT /tags/{id}
- `deleteTag(tagId)` - DELETE /tags/{id}

### Admin
- `getAllUsers()` - GET /admin/users
- `banUser(userId)` - POST /admin/users/{id}/ban
- `unbanUser(userId)` - POST /admin/users/{id}/unban
- `getDashboardStats()` - GET /admin/dashboard

## Configuration

The API base URL can be configured via environment variables:
- `NEXT_PUBLIC_API_BASE_URL` - Default: https://sound-effect-buttons.onrender.com

## Authentication

The API instance automatically includes authentication tokens from localStorage when available. The token should be stored with the key `authToken`.

## Error Handling

All API calls return a standardized response format:
```javascript
{
  success: boolean,
  data: any | null,
  error: {
    message: string,
    status: number
  } | null
}
```

## Caching

The API utilities include caching functionality for frequently accessed data. Cache can be cleared using `clearCache()` or `clearCache(pattern)` for selective clearing.




