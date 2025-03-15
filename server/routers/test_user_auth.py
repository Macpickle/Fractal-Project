import pytest
import json
import os
from unittest.mock import mock_open, patch
from users import register_user, login_user  

TEST_DB_PATH = "userData.json"

@pytest.fixture
def mock_json_db():
    """Fixture to create a mock JSON database for testing."""
    test_data = [
        {"user_name": "jack123", "user_pass": "jackpass"},
        {"user_name": "apple", "user_pass": "123"}
    ]
    with patch("app.DB_PATH", TEST_DB_PATH):  # Override the database path
        with patch("builtins.open", mock_open(read_data=json.dumps(test_data))) as mock_file:
            yield mock_file
    if os.path.exists(TEST_DB_PATH):
        os.remove(TEST_DB_PATH)  # Cleanup after tests

def test_user_registration(mock_json_db):
    """Test if a new user can register successfully."""
    response = register_user("testuser", "securepassword")
    assert response["status"] == "success"
    assert response["message"] == "User registered successfully"

def test_successful_login(mock_json_db):
    """Test if a registered user can log in."""
    register_user("testuser", "securepassword")
    response = login_user("testuser", "securepassword")

    assert response["status"] == "success"
    assert "token" in response  # Assuming login returns a token

def test_login_fails_with_wrong_password(mock_json_db):
    """Ensure login fails with incorrect password."""
    register_user("testuser", "securepassword")
    response = login_user("testuser", "wrongpassword")

    assert response["status"] == "error"
    assert response["message"] == "Invalid credentials"

def test_prevent_duplicate_registration(mock_json_db):
    """Test that duplicate user registration is not allowed."""
    register_user("testuser", "securepassword")
    response = register_user("testuser", "anotherpassword")

    assert response["status"] == "error"
    assert response["message"] == "User already exists"
