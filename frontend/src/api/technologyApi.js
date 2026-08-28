const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getTechnologies() {
  const response = await request("/technologies");
  return response.value ?? response;
}

export async function getTechnology(name) {
  return request(`/technologies/${encodeURIComponent(name)}`);
}

export async function getTechnologySkills(name) {
  const response = await request(
    `/technologies/${encodeURIComponent(name)}/skills`
  );

  return response.value ?? response;
}

export async function getTechnologyProjects(name) {
  const response = await request(
    `/technologies/${encodeURIComponent(name)}/projects`
  );

  return response.value ?? response;
}

export async function getRelatedTechnologies(name) {
  const response = await request(
    `/technologies/${encodeURIComponent(name)}/related`
  );

  return response.value ?? response;
}

export async function getConnections(name) {
  const response = await request(
    `/technologies/${encodeURIComponent(name)}/connections`
  );

  return response.value ?? response;
}

export async function getTechnologyGraph(name) {
  const response = await request(
    `/technologies/${encodeURIComponent(name)}/graph`
  );

  return response.value ?? response;
}

export async function getTechnologyRecommendations(name) {
  const response = await request(
    `/technologies/${encodeURIComponent(name)}/recommendations`
  );

  return response.value ?? response;
}

export async function getCategories() {
  const response = await request("/categories");

  return response.value ?? response;
}

export async function getTechnologiesByCategory(category) {
  const response = await request(
    `/categories/${encodeURIComponent(category)}/technologies`
  );

  return response.value ?? response;
}