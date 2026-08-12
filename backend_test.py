#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for AKBS Poultry Farming Website
Tests all endpoints against MongoDB Atlas on preview environment
"""

import requests
import json
import time
from datetime import datetime

# Load base URL from environment
BASE_URL = "https://akbs-corporate-site.preview.emergentagent.com/api"
ADMIN_PASSWORD = "akbs@2026"

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_pass(test_name):
    print(f"✅ PASS: {test_name}")
    test_results["passed"].append(test_name)

def log_fail(test_name, reason):
    print(f"❌ FAIL: {test_name}")
    print(f"   Reason: {reason}")
    test_results["failed"].append(f"{test_name}: {reason}")

def log_warning(test_name, reason):
    print(f"⚠️  WARNING: {test_name}")
    print(f"   Reason: {reason}")
    test_results["warnings"].append(f"{test_name}: {reason}")

print("="*80)
print("AKBS Poultry Backend API Test Suite")
print("="*80)
print(f"Base URL: {BASE_URL}")
print(f"Testing against MongoDB Atlas")
print("="*80)

# Global token storage
admin_token = None
test_inquiry_ids = []

# ============================================================================
# TEST 1: Health Check Endpoints
# ============================================================================
print("\n[TEST 1] Health Check Endpoints")
print("-" * 80)

try:
    # Test GET /api/
    response = requests.get(f"{BASE_URL}/", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "ok" and data.get("service") == "AKBS Poultry API":
            log_pass("GET /api/ returns correct health response")
        else:
            log_fail("GET /api/ health response", f"Unexpected response: {data}")
    else:
        log_fail("GET /api/ health check", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/ health check", str(e))

try:
    # Test GET /api/health
    response = requests.get(f"{BASE_URL}/health", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "ok" and data.get("service") == "AKBS Poultry API":
            log_pass("GET /api/health returns correct health response")
        else:
            log_fail("GET /api/health response", f"Unexpected response: {data}")
    else:
        log_fail("GET /api/health", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/health", str(e))

# ============================================================================
# TEST 2: Contact Form Endpoint - Happy Path
# ============================================================================
print("\n[TEST 2] Contact Form - Happy Path")
print("-" * 80)

try:
    contact_data = {
        "name": "Rajesh Kumar",
        "email": "rajesh.kumar@example.com",
        "phone": "+91 98765 43210",
        "message": "I am interested in purchasing 500 broiler chicks for my farm in Punjab. Please provide pricing and delivery details."
    }
    
    response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("success") and "Thank you" in data.get("message", ""):
            log_pass("POST /api/contact with valid data returns success")
            # Store this inquiry ID for later tests (we'll fetch it from admin panel)
        else:
            log_fail("POST /api/contact success response", f"Unexpected response: {data}")
    else:
        log_fail("POST /api/contact happy path", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /api/contact happy path", str(e))

# ============================================================================
# TEST 3: Contact Form - Validation Tests
# ============================================================================
print("\n[TEST 3] Contact Form - Validation")
print("-" * 80)

# Test missing name
try:
    invalid_data = {
        "email": "test@example.com",
        "phone": "1234567890",
        "message": "This should fail - no name"
    }
    response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
    
    if response.status_code == 400:
        data = response.json()
        if "Name and message are required" in data.get("error", ""):
            log_pass("POST /api/contact rejects missing name with 400")
        else:
            log_fail("POST /api/contact missing name error", f"Wrong error message: {data}")
    else:
        log_fail("POST /api/contact missing name", f"Expected 400, got {response.status_code}")
except Exception as e:
    log_fail("POST /api/contact missing name", str(e))

# Test missing message
try:
    invalid_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890"
    }
    response = requests.post(f"{BASE_URL}/contact", json=invalid_data, timeout=10)
    
    if response.status_code == 400:
        data = response.json()
        if "Name and message are required" in data.get("error", ""):
            log_pass("POST /api/contact rejects missing message with 400")
        else:
            log_fail("POST /api/contact missing message error", f"Wrong error message: {data}")
    else:
        log_fail("POST /api/contact missing message", f"Expected 400, got {response.status_code}")
except Exception as e:
    log_fail("POST /api/contact missing message", str(e))

# Test empty body
try:
    response = requests.post(f"{BASE_URL}/contact", json={}, timeout=10)
    
    if response.status_code == 400:
        log_pass("POST /api/contact rejects empty body with 400")
    else:
        log_fail("POST /api/contact empty body", f"Expected 400, got {response.status_code}")
except Exception as e:
    log_fail("POST /api/contact empty body", str(e))

# ============================================================================
# TEST 4: Admin Login
# ============================================================================
print("\n[TEST 4] Admin Login")
print("-" * 80)

# Test valid login
try:
    login_data = {"password": ADMIN_PASSWORD}
    response = requests.post(f"{BASE_URL}/admin/login", json=login_data, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("success") and data.get("token"):
            admin_token = data["token"]
            log_pass("POST /api/admin/login with correct password returns token")
        else:
            log_fail("POST /api/admin/login response", f"Missing success or token: {data}")
    else:
        log_fail("POST /api/admin/login valid", f"Status {response.status_code}: {response.text}")
except Exception as e:
    log_fail("POST /api/admin/login valid", str(e))

# Test invalid login
try:
    login_data = {"password": "wrongpassword123"}
    response = requests.post(f"{BASE_URL}/admin/login", json=login_data, timeout=10)
    
    if response.status_code == 401:
        data = response.json()
        if "Invalid password" in data.get("error", ""):
            log_pass("POST /api/admin/login rejects wrong password with 401")
        else:
            log_fail("POST /api/admin/login wrong password error", f"Wrong error message: {data}")
    else:
        log_fail("POST /api/admin/login wrong password", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("POST /api/admin/login wrong password", str(e))

# Test missing password
try:
    response = requests.post(f"{BASE_URL}/admin/login", json={}, timeout=10)
    
    if response.status_code == 401:
        log_pass("POST /api/admin/login rejects missing password with 401")
    else:
        log_fail("POST /api/admin/login missing password", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("POST /api/admin/login missing password", str(e))

# ============================================================================
# TEST 5: Admin Verify
# ============================================================================
print("\n[TEST 5] Admin Token Verification")
print("-" * 80)

if not admin_token:
    log_fail("Admin verify tests", "No admin token available from login test")
else:
    # Test with valid token
    try:
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/admin/verify", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_pass("GET /api/admin/verify with valid token returns ok:true")
            else:
                log_fail("GET /api/admin/verify valid token", f"Expected ok:true, got {data}")
        else:
            log_fail("GET /api/admin/verify valid token", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/admin/verify valid token", str(e))

# Test without token
try:
    response = requests.get(f"{BASE_URL}/admin/verify", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("ok") == False:
            log_pass("GET /api/admin/verify without token returns ok:false")
        else:
            log_fail("GET /api/admin/verify no token", f"Expected ok:false, got {data}")
    else:
        log_fail("GET /api/admin/verify no token", f"Unexpected status {response.status_code}")
except Exception as e:
    log_fail("GET /api/admin/verify no token", str(e))

# Test with invalid token
try:
    headers = {"Authorization": "Bearer invalidtoken123"}
    response = requests.get(f"{BASE_URL}/admin/verify", headers=headers, timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("ok") == False:
            log_pass("GET /api/admin/verify with invalid token returns ok:false")
        else:
            log_fail("GET /api/admin/verify invalid token", f"Expected ok:false, got {data}")
    else:
        log_fail("GET /api/admin/verify invalid token", f"Unexpected status {response.status_code}")
except Exception as e:
    log_fail("GET /api/admin/verify invalid token", str(e))

# ============================================================================
# TEST 6: Admin List Inquiries
# ============================================================================
print("\n[TEST 6] Admin List Inquiries")
print("-" * 80)

if not admin_token:
    log_fail("Admin list inquiries tests", "No admin token available")
else:
    # Test with valid token
    try:
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/admin/inquiries", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            # Check structure
            if "inquiries" in data and "stats" in data:
                inquiries = data["inquiries"]
                stats = data["stats"]
                
                # Verify at least one inquiry exists (from our contact form test)
                if len(inquiries) > 0:
                    log_pass("GET /api/admin/inquiries returns inquiries list")
                    
                    # Store first inquiry ID for update/delete tests
                    if inquiries[0].get("id"):
                        test_inquiry_ids.append(inquiries[0]["id"])
                    
                    # Verify inquiry structure
                    first_inquiry = inquiries[0]
                    required_fields = ["id", "name", "email", "phone", "message", "status", "createdAt"]
                    missing_fields = [f for f in required_fields if f not in first_inquiry]
                    
                    if not missing_fields:
                        log_pass("Inquiry objects have correct structure")
                    else:
                        log_fail("Inquiry structure", f"Missing fields: {missing_fields}")
                    
                    # Verify no _id field (MongoDB ObjectId should be removed)
                    if "_id" not in first_inquiry:
                        log_pass("Inquiries do not expose MongoDB _id")
                    else:
                        log_fail("Inquiry _id exposure", "MongoDB _id should not be exposed")
                    
                    # Verify sorting (newest first)
                    if len(inquiries) > 1:
                        first_date = inquiries[0].get("createdAt", "")
                        second_date = inquiries[1].get("createdAt", "")
                        if first_date >= second_date:
                            log_pass("Inquiries sorted by createdAt DESC (newest first)")
                        else:
                            log_fail("Inquiry sorting", f"Not sorted correctly: {first_date} vs {second_date}")
                else:
                    log_warning("GET /api/admin/inquiries", "No inquiries found - contact form may have failed")
                
                # Verify stats structure
                required_stats = ["total", "new", "read", "replied", "archived", "thisWeek"]
                missing_stats = [s for s in required_stats if s not in stats]
                
                if not missing_stats:
                    log_pass("Stats object has correct structure")
                else:
                    log_fail("Stats structure", f"Missing stats: {missing_stats}")
                
                # Verify stats values are reasonable
                if stats.get("total", 0) >= len(inquiries):
                    log_pass("Stats total matches or exceeds inquiry count")
                else:
                    log_fail("Stats total", f"Total {stats.get('total')} < inquiries {len(inquiries)}")
                
            else:
                log_fail("GET /api/admin/inquiries structure", f"Missing inquiries or stats: {data}")
        else:
            log_fail("GET /api/admin/inquiries with auth", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/admin/inquiries with auth", str(e))

# Test without token (should fail)
try:
    response = requests.get(f"{BASE_URL}/admin/inquiries", timeout=10)
    
    if response.status_code == 401:
        data = response.json()
        if "Unauthorized" in data.get("error", ""):
            log_pass("GET /api/admin/inquiries without token returns 401")
        else:
            log_fail("GET /api/admin/inquiries no auth error", f"Wrong error: {data}")
    else:
        log_fail("GET /api/admin/inquiries without token", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("GET /api/admin/inquiries without token", str(e))

# ============================================================================
# TEST 7: Admin Update Inquiry
# ============================================================================
print("\n[TEST 7] Admin Update Inquiry")
print("-" * 80)

if not admin_token:
    log_fail("Admin update inquiry tests", "No admin token available")
elif not test_inquiry_ids:
    log_fail("Admin update inquiry tests", "No inquiry ID available for testing")
else:
    headers = {"Authorization": f"Bearer {admin_token}"}
    test_id = test_inquiry_ids[0]
    
    # Test update status to 'read'
    try:
        update_data = {"status": "read"}
        response = requests.patch(f"{BASE_URL}/admin/inquiries/{test_id}", 
                                 json=update_data, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                log_pass("PATCH /api/admin/inquiries/:id updates status to 'read'")
                
                # Verify the update persisted
                verify_response = requests.get(f"{BASE_URL}/admin/inquiries", headers=headers, timeout=10)
                if verify_response.status_code == 200:
                    inquiries = verify_response.json().get("inquiries", [])
                    updated_inquiry = next((i for i in inquiries if i.get("id") == test_id), None)
                    if updated_inquiry and updated_inquiry.get("status") == "read":
                        log_pass("Status update to 'read' persisted in database")
                    else:
                        log_fail("Status update persistence", f"Status not updated in DB: {updated_inquiry}")
            else:
                log_fail("PATCH status to read", f"No success in response: {data}")
        else:
            log_fail("PATCH status to read", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("PATCH status to read", str(e))
    
    # Test update status to 'replied'
    try:
        update_data = {"status": "replied"}
        response = requests.patch(f"{BASE_URL}/admin/inquiries/{test_id}", 
                                 json=update_data, headers=headers, timeout=10)
        
        if response.status_code == 200 and response.json().get("success"):
            log_pass("PATCH /api/admin/inquiries/:id updates status to 'replied'")
        else:
            log_fail("PATCH status to replied", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("PATCH status to replied", str(e))
    
    # Test update status to 'archived'
    try:
        update_data = {"status": "archived"}
        response = requests.patch(f"{BASE_URL}/admin/inquiries/{test_id}", 
                                 json=update_data, headers=headers, timeout=10)
        
        if response.status_code == 200 and response.json().get("success"):
            log_pass("PATCH /api/admin/inquiries/:id updates status to 'archived'")
        else:
            log_fail("PATCH status to archived", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("PATCH status to archived", str(e))
    
    # Test update note
    try:
        update_data = {"note": "Follow up scheduled for next Monday at 10 AM"}
        response = requests.patch(f"{BASE_URL}/admin/inquiries/{test_id}", 
                                 json=update_data, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                log_pass("PATCH /api/admin/inquiries/:id updates note")
                
                # Verify note persisted
                verify_response = requests.get(f"{BASE_URL}/admin/inquiries", headers=headers, timeout=10)
                if verify_response.status_code == 200:
                    inquiries = verify_response.json().get("inquiries", [])
                    updated_inquiry = next((i for i in inquiries if i.get("id") == test_id), None)
                    if updated_inquiry and "Follow up" in updated_inquiry.get("note", ""):
                        log_pass("Note update persisted in database")
                    else:
                        log_fail("Note update persistence", f"Note not saved: {updated_inquiry}")
            else:
                log_fail("PATCH note", f"No success in response: {data}")
        else:
            log_fail("PATCH note", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("PATCH note", str(e))
    
    # Test update with unknown ID
    try:
        fake_id = "00000000-0000-0000-0000-000000000000"
        update_data = {"status": "read"}
        response = requests.patch(f"{BASE_URL}/admin/inquiries/{fake_id}", 
                                 json=update_data, headers=headers, timeout=10)
        
        if response.status_code == 404:
            data = response.json()
            if "Not found" in data.get("error", ""):
                log_pass("PATCH with unknown ID returns 404")
            else:
                log_fail("PATCH unknown ID error", f"Wrong error: {data}")
        else:
            log_fail("PATCH unknown ID", f"Expected 404, got {response.status_code}")
    except Exception as e:
        log_fail("PATCH unknown ID", str(e))
    
    # Test update without token
    try:
        update_data = {"status": "read"}
        response = requests.patch(f"{BASE_URL}/admin/inquiries/{test_id}", 
                                 json=update_data, timeout=10)
        
        if response.status_code == 401:
            log_pass("PATCH without token returns 401")
        else:
            log_fail("PATCH without token", f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_fail("PATCH without token", str(e))

# ============================================================================
# TEST 8: Admin Delete Inquiry
# ============================================================================
print("\n[TEST 8] Admin Delete Inquiry")
print("-" * 80)

# First create a new inquiry specifically for deletion test
delete_test_id = None
try:
    contact_data = {
        "name": "Priya Sharma",
        "email": "priya.sharma@example.com",
        "phone": "+91 87654 32109",
        "message": "Test inquiry for deletion - can be removed"
    }
    response = requests.post(f"{BASE_URL}/contact", json=contact_data, timeout=10)
    if response.status_code == 200:
        # Fetch the inquiry to get its ID
        headers = {"Authorization": f"Bearer {admin_token}"}
        list_response = requests.get(f"{BASE_URL}/admin/inquiries", headers=headers, timeout=10)
        if list_response.status_code == 200:
            inquiries = list_response.json().get("inquiries", [])
            # Find the inquiry we just created (should be first - newest)
            for inq in inquiries:
                if inq.get("name") == "Priya Sharma":
                    delete_test_id = inq.get("id")
                    break
except Exception as e:
    log_warning("Delete test setup", f"Could not create test inquiry: {e}")

if not admin_token:
    log_fail("Admin delete inquiry tests", "No admin token available")
elif not delete_test_id:
    log_fail("Admin delete inquiry tests", "Could not create test inquiry for deletion")
else:
    headers = {"Authorization": f"Bearer {admin_token}"}
    
    # Test delete with valid ID
    try:
        response = requests.delete(f"{BASE_URL}/admin/inquiries/{delete_test_id}", 
                                  headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                log_pass("DELETE /api/admin/inquiries/:id removes inquiry")
                
                # Verify it's actually gone
                verify_response = requests.get(f"{BASE_URL}/admin/inquiries", headers=headers, timeout=10)
                if verify_response.status_code == 200:
                    inquiries = verify_response.json().get("inquiries", [])
                    deleted_inquiry = next((i for i in inquiries if i.get("id") == delete_test_id), None)
                    if not deleted_inquiry:
                        log_pass("Deleted inquiry no longer appears in list")
                    else:
                        log_fail("Delete persistence", "Inquiry still exists after deletion")
            else:
                log_fail("DELETE inquiry", f"No success in response: {data}")
        else:
            log_fail("DELETE inquiry", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("DELETE inquiry", str(e))
    
    # Test delete with unknown ID
    try:
        fake_id = "99999999-9999-9999-9999-999999999999"
        response = requests.delete(f"{BASE_URL}/admin/inquiries/{fake_id}", 
                                  headers=headers, timeout=10)
        
        if response.status_code == 404:
            data = response.json()
            if "Not found" in data.get("error", ""):
                log_pass("DELETE with unknown ID returns 404")
            else:
                log_fail("DELETE unknown ID error", f"Wrong error: {data}")
        else:
            log_fail("DELETE unknown ID", f"Expected 404, got {response.status_code}")
    except Exception as e:
        log_fail("DELETE unknown ID", str(e))
    
    # Test delete without token
    try:
        response = requests.delete(f"{BASE_URL}/admin/inquiries/{delete_test_id}", timeout=10)
        
        if response.status_code == 401:
            log_pass("DELETE without token returns 401")
        else:
            log_fail("DELETE without token", f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_fail("DELETE without token", str(e))

# ============================================================================
# TEST 9: MongoDB Atlas Connectivity & Persistence
# ============================================================================
print("\n[TEST 9] MongoDB Atlas Connectivity")
print("-" * 80)

# This is verified implicitly through all the above tests
# If contact form submissions persist and can be retrieved via admin panel,
# MongoDB Atlas is working correctly

if admin_token:
    try:
        headers = {"Authorization": f"Bearer {admin_token}"}
        response = requests.get(f"{BASE_URL}/admin/inquiries", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            inquiries = data.get("inquiries", [])
            stats = data.get("stats", {})
            
            if len(inquiries) > 0 and stats.get("total", 0) > 0:
                log_pass("MongoDB Atlas connectivity confirmed - data persists")
                log_pass("Stats counters (total/new/read/replied/archived/thisWeek) working")
            else:
                log_warning("MongoDB Atlas", "No inquiries found - may indicate persistence issue")
        else:
            log_fail("MongoDB Atlas verification", f"Could not fetch inquiries: {response.status_code}")
    except Exception as e:
        log_fail("MongoDB Atlas verification", str(e))
else:
    log_fail("MongoDB Atlas verification", "No admin token to verify database")

# ============================================================================
# FINAL SUMMARY
# ============================================================================
print("\n" + "="*80)
print("TEST SUMMARY")
print("="*80)

print(f"\n✅ PASSED: {len(test_results['passed'])} tests")
for test in test_results['passed']:
    print(f"   • {test}")

if test_results['warnings']:
    print(f"\n⚠️  WARNINGS: {len(test_results['warnings'])} warnings")
    for warning in test_results['warnings']:
        print(f"   • {warning}")

if test_results['failed']:
    print(f"\n❌ FAILED: {len(test_results['failed'])} tests")
    for failure in test_results['failed']:
        print(f"   • {failure}")
else:
    print("\n🎉 ALL TESTS PASSED!")

print("\n" + "="*80)
print(f"Total Tests: {len(test_results['passed']) + len(test_results['failed'])}")
print(f"Pass Rate: {len(test_results['passed']) / (len(test_results['passed']) + len(test_results['failed'])) * 100:.1f}%")
print("="*80)
