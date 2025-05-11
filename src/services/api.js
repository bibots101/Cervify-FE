const BACKEND_URL = "http://127.0.0.1:8000";

async function handleResponse(response) {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Unknown error occurred");
    } catch {
      throw new Error("Server error");
    }
  }
  return await response.json();
}

export async function signup(username, password, fullName) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("full_name", fullName);

  const res = await fetch(`${BACKEND_URL}/signup/`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(res);
}

export async function login(username, password) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const res = await fetch(`${BACKEND_URL}/login/`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(res);
}

export async function predictImage(file, username) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", username);

  const res = await fetch(`${BACKEND_URL}/predict/`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(res);
}

export async function getHistory(username) {
  const res = await fetch(`${BACKEND_URL}/history/?username=${username}`, {
    method: "GET",
  });

  return handleResponse(res);
}

export async function getPipelineProgress(filename) {
  const res = await fetch(`${BACKEND_URL}/progress/${filename}`);

  return handleResponse(res);
}

export async function deleteImage(imageName, username) {
  const formData = new FormData();
  formData.append("image_name", imageName);
  formData.append("username", username);

  const res = await fetch(`${BACKEND_URL}/deleteImage/`, {
    method: "DELETE",
    body: formData,
  });

  return handleResponse(res);
}

export async function deleteAccount(username, password) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const res = await fetch(`${BACKEND_URL}/delete_account/`, {
    method: "DELETE",
    body: formData,
  });

  return handleResponse(res);
}
