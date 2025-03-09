import unittest
from unittest.mock import patch, mock_open
from server.database.database import read_data_from_db, write_data_to_db, database, InvalidUsername, LoginSuccess, LoginFail
from server.models.user.userModel import userItem

class MyTestResult(unittest.TestResult):
    def addSuccess(self, test):
        super().addSuccess(test)
        print(f"✅")  # Print checkmark for success

    def addFailure(self, test, err):
        super().addFailure(test, err)
        print(f"❌")  # Print cross for failure

    def addError(self, test, err):
        super().addError(test, err)
        print(f"❌")  # Print cross for error

class TestDatabaseFunctions(unittest.TestCase):

    @patch("builtins.open", new_callable=mock_open, read_data='[{"id": 1, "name": "test"}]')
    @patch("json.load")
    def test_read_data_from_db_success(self, mock_json_load, mock_file):
        """Test that read_data_from_db returns the correct data when the file exists."""
        mock_json_load.return_value = [{"id": 1, "name": "test"}]
        expected_result = [{"id": 1, "name": "test"}]
        result = read_data_from_db("test.json")
        print(f"test_read_data_from_db_success: Expected: {expected_result}, Actual: {result}")
        self.assertEqual(result, expected_result)
        

    @patch("builtins.open", side_effect=FileNotFoundError)
    def test_read_data_from_db_file_not_found(self, mock_file):
        """Test that read_data_from_db returns an empty list when the file is not found."""
        expected_result = []
        result = read_data_from_db("nonexistent.json")
        print(f"test_read_data_from_db_file_not_found: Expected: {expected_result}, Actual: {result}")
        self.assertEqual(result, expected_result)
       

    @patch("builtins.open", new_callable=mock_open)
    @patch("json.dump")
    def test_write_data_to_db_success(self, mock_json_dump, mock_file):
        """Test that write_data_to_db writes data to the file successfully."""
        data = [{"id": 2, "name": "new_test"}]
        expected_result = True
        result = write_data_to_db(data, "test.json")
        print(f"test_write_data_to_db_success: Expected: {expected_result}, Actual: {result}")
        self.assertEqual(result, expected_result)
        mock_json_dump.assert_called_once_with(data, mock_file(), indent=2)
        

    @patch("builtins.open", side_effect=FileNotFoundError)
    def test_write_data_to_db_file_not_found(self, mock_file):
        """Test that write_data_to_db returns False when the file is not found."""
        data = [{"id": 2, "name": "new_test"}]
        expected_result = False
        result = write_data_to_db(data, "nonexistent.json")
        print(f"test_write_data_to_db_file_not_found: Expected: {expected_result}, Actual: {result}")

        self.assertEqual(result, expected_result)
       
class TestDatabaseClass(unittest.TestCase):

    def setUp(self):
        """Set up test data for TestDatabaseClass."""
        self.test_data = [{"id": 1, "name": "test1"}, {"id": 2, "name": "test2"}]
        with patch("server.database.database.read_data_from_db", return_value=self.test_data):
            self.db = database("test.json")

    @patch("server.database.database.write_data_to_db")
    def test_getData_with_id(self, mock_write):
        """Test that getData returns the correct entry when given an ID."""
        expected_result = {"id": 2, "name": "test2"}
        result = self.db.getData(2)
        print(f"test_getData_with_id: Expected: {expected_result}, Actual: {result}")
        self.assertEqual(result, expected_result)
        

    @patch("server.database.database.write_data_to_db")
    def test_getData_without_id(self, mock_write):
        """Test that getData returns all entries when no ID is given."""
        expected_result = self.test_data.copy()
        result = self.db.getData()
        print(f"test_getData_without_id: Expected: {expected_result}, Actual: {result}")
        self.assertEqual(result, expected_result)
        
    @patch("server.database.database.write_data_to_db")
    def test_addData(self, mock_write):
        """Test that addData adds a new entry to the database."""
        new_entry = {"id": 3, "name": "test3"}
        expected_size = 3
        self.db.addData(new_entry)
        self.assertIn(new_entry, self.db.getData())
        print(f"test_addData: Expected size: {expected_size}, Actual size: {self.db.getDataSize()}")
        self.assertEqual(self.db.getDataSize(), expected_size)
       

    @patch("server.database.database.write_data_to_db")
    def test_deleteData_success(self, mock_write):
        """Test that deleteData successfully deletes an existing entry."""
        entry_to_delete = {"id": 2}
        expected_size = 1
        result = self.db.deleteData(entry_to_delete)
        print(f"test_deleteData_success: Expected size: {expected_size}, Actual size: {self.db.getDataSize()}")
        self.assertTrue(result)
        self.assertEqual(self.db.getDataSize(), expected_size)
        self.assertNotIn(entry_to_delete, self.db.getData())
        

    @patch("server.database.database.write_data_to_db")
    def test_deleteData_failure(self, mock_write):
        """Test that deleteData returns False when trying to delete a non-existent entry."""
        entry_to_delete = {"id": 4}
        expected_result = False
        expected_size = 2
        result = self.db.deleteData(entry_to_delete)
        print(f"test_deleteData_failure: Expected: {expected_result}, Actual: {result}, Expected size: {expected_size}, Actual size: {self.db.getDataSize()}")
        self.assertEqual(result, expected_result)
        self.assertEqual(self.db.getDataSize(), expected_size)
        

    @patch("server.database.database.write_data_to_db")
    def test_modifyData_success(self, mock_write):
        """Test that modifyData successfully modifies an existing entry."""
        modified_entry = {"id": 1, "name": "modified_test1"}
        expected_name = "modified_test1"
        result = self.db.modifyData(modified_entry)
        print(f"test_modifyData_success: Expected name: {expected_name}, Actual name: {self.db.getData(1)['name']}")
        self.assertTrue(result)
        self.assertEqual(self.db.getData(1)["name"], expected_name)
        
    @patch("server.database.database.write_data_to_db")
    def test_modifyData_failure(self, mock_write):
        """Test that modifyData returns False when trying to modify a non-existent entry."""
        modified_entry = {"id": 4, "name": "modified_test4"}
        expected_result = False
        result = self.db.modifyData(modified_entry)
        print(f"test_modifyData_failure: Expected: {expected_result}, Actual: {result}")
        self.assertEqual(result, expected_result)
        

    def test_getDataSize(self):
        """Test that getDataSize returns the correct size of the database."""
        expected_size = 2
        result = self.db.getDataSize()
        print(f"test_getDataSize: Expected: {expected_size}, Actual: {result}")
        self.assertEqual(result, expected_size)
        

class TestErrorClasses(unittest.TestCase):
    def test_invalid_username(self):
        """Test that InvalidUsername exception is raised with the correct message."""
        expected_message = "Username testuser is not valid (Duplicate)"
        with self.assertRaises(InvalidUsername) as context:
            raise InvalidUsername("testuser")
        print(f"test_invalid_username: Expected message: {expected_message}, Actual message: {str(context.exception)}")
        self.assertEqual(str(context.exception), expected_message)
       

    def test_login_success(self):
        """Test that LoginSuccess exception is raised with the correct message."""
        expected_message = "Success login testuser"
        with self.assertRaises(LoginSuccess) as context:
            raise LoginSuccess(userItem(user_name="testuser", user_pass="password"))
        print(f"test_login_success: Expected message: {expected_message}, Actual message: {str(context.exception)}")
        self.assertEqual(str(context.exception), expected_message)
       

    def test_login_fail(self):
        """Test that LoginFail exception is raised with the correct message."""
        expected_message = "Failed login testuser"
        with self.assertRaises(LoginFail) as context:
            raise LoginFail(userItem(user_name="testuser", user_pass="password"))
        print(f"test_login_fail: Expected message: {expected_message}, Actual message: {str(context.exception)}")
        self.assertEqual(str(context.exception), expected_message)
       

if __name__ == '__main__':
    unittest.main(testRunner=unittest.TextTestRunner(resultclass=MyTestResult))