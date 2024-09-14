using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.AuthDTO;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/auth")]
    [ApiController]


    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;

        public AuthController(UserManager<AppUser> userManager, TokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            };

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email);
            if (user == null) return Unauthorized("Invalid Email!");
            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded) return Unauthorized("Email not found and/or password incorrect");
            // var roles = await _userManager.GetRolesAsync(user);

            return Ok(
                new NewUserDTO
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user),
                    UserId = user.Id,
                    Role = user.Role
                }
            );


        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDTO)
        {
            try
            {

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var checkEmailDuplicate = await _userManager.FindByEmailAsync(registerDTO.Email);

                if (checkEmailDuplicate != null)
                {
                    return StatusCode(500, "Email already exists!!");
                }

                var appUser = new AppUser
                {
                    UserName = registerDTO.Username,
                    Email = registerDTO.Email,
                    ProfilePic = registerDTO.ProfilePic,
                    CoverPic = registerDTO.CoverPic,
                    Role = registerDTO.Role,
                };
                var createdUser = await _userManager.CreateAsync(appUser, registerDTO.Password);

                if (createdUser.Succeeded)
                {
                    // var roleResult = await _userManager.AddToRoleAsync(appUser, registerDTO.Role);
                    // if (roleResult.Succeeded)
                    // {
                    return Ok(
                        new NewUserDTO
                        {
                            Username = appUser.UserName,
                            Email = appUser.Email,
                        }
                    );
                    // }
                    // else
                    // {
                    //     return StatusCode(500, roleResult.Errors);
                    // }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {

                return StatusCode(500, e);
            }
        }

        [HttpGet("getAllAdmins")]
        public async Task<IActionResult> GetAllAdmins()
        {
            var allUsers = await _userManager.Users.ToListAsync();
            var userDtos = allUsers.Select(u => new GetAdminDto
            {
                AdminId = u.Id,
                Username = u.UserName,
                Email = u.Email,
                Role = u.Role
            });


            return Ok(userDtos);
        }


        [HttpGet("get-profile/{Id}")]
        public async Task<IActionResult> GetUserInfroFromUid([FromRoute] string Id)
        {
            try
            {
                var getUser = await _userManager.FindByIdAsync(Id);
                if (getUser == null)
                {
                    return NotFound();
                }

                var allInfo = new AdminInfoDto
                {
                    CoverPic = getUser.CoverPic,
                    ProfilePic = getUser.ProfilePic,
                    Username = getUser.UserName,
                    Email = getUser.Email
                };
                return StatusCode(200, allInfo);
            }
            catch (Exception error)
            {
                return StatusCode(500, error);
            }

        }

        // Update Admin Info
        [HttpPut("update-info/{id}")]
        public async Task<IActionResult> UpdateAdminInfo(string id, [FromBody] AdminInfoDto adminInfoDto)
        {
            var findAdminProfile = await _userManager.FindByIdAsync(id);
            if (findAdminProfile == null)
            {
                return NotFound();
            }

            findAdminProfile.UserName = adminInfoDto.Username;
            findAdminProfile.Email = adminInfoDto.Email;
            findAdminProfile.ProfilePic = adminInfoDto.ProfilePic;
            findAdminProfile.CoverPic = adminInfoDto.CoverPic;

            var result = await _userManager.UpdateAsync(findAdminProfile);

            if (result.Succeeded)
            {
                var updatedInfo = new AdminInfoDto
                {
                    Username = findAdminProfile.UserName,
                    Email = findAdminProfile.Email,
                    ProfilePic = findAdminProfile.ProfilePic,
                    CoverPic = findAdminProfile.CoverPic
                };
                return Ok(updatedInfo);
            }

            return StatusCode(500, result.Errors);
        }

        [HttpDelete("deactivate/{id}")]
        public async Task<IActionResult> DeactivateAdminAccount([FromRoute] string id)
        {
            try
            {
                var getDesiredAdmin = await _userManager.FindByIdAsync(id);
                if (getDesiredAdmin == null)
                {
                    return NotFound();
                }

                await _userManager.DeleteAsync(getDesiredAdmin);

                return StatusCode(200, "Desired Account Deleted!");

            }
            catch (Exception error)
            {

                return StatusCode(500, error);
            }
        }

        [HttpPut("changePassword/{id}")]
        public async Task<IActionResult> changePassword(string id, [FromBody] ChangePasswordDto changePasswordDto)
        {

            var getDesiredAccount = await _userManager.FindByIdAsync(id);

            if (getDesiredAccount == null)
            {
                return NotFound();
            }
            var result = await _signinManager.CheckPasswordSignInAsync(getDesiredAccount, changePasswordDto.oldPassword, false);
            if (!result.Succeeded) return StatusCode(500, "Wrong Password!");

            var passwordChangeResult = await _userManager.ChangePasswordAsync(getDesiredAccount, changePasswordDto.oldPassword, changePasswordDto.newPassword);

            if (!passwordChangeResult.Succeeded)
            {
                return StatusCode(400, "Password change failed");
            }

            return Ok("Password changed successfully");

        }
    }
}