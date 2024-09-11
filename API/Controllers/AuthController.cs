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
            var roles = await _userManager.GetRolesAsync(user);



            return Ok(
                new NewUserDTO
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user),
                    UserId = user.Id,
                    Roles = roles

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
                    Email = registerDTO.Email
                };
                var createdUser = await _userManager.CreateAsync(appUser, registerDTO.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, registerDTO.Role);
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDTO
                            {
                                Username = appUser.UserName,
                                Email = appUser.Email,
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
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

        [Authorize]
        [HttpGet("verify-token")]
        public async Task<IActionResult> VerifyToken()
        {
            // var userId = User.GetUserId();
            // var user = await _userManager.FindByIdAsync(userId);
            // if (user == null)
            // {
            //     return NotFound();
            // }
            // var roles = await _userManager.GetRolesAsync(user);

            var allUser = await _userManager.Users.ToListAsync();
            if (allUser == null)
            {
                return NotFound();

            }

            return Ok(allUser);
        }


    }
}