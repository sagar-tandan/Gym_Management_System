using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/member")]
    public class MemberController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public MemberController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterMember([FromBody] MemberRegistration memberRegistration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newMember = new MemberRegistration
            {
                MemberName = memberRegistration.MemberName,
                JoiningDate = memberRegistration.JoiningDate,
                EmailAddress = memberRegistration.EmailAddress,
                Contact = memberRegistration.Contact,
                Plan = memberRegistration.Plan,
                Price = memberRegistration.Price
            };

            try
            {
                await _context.MemberRegistrations.AddAsync(newMember);
                await _context.SaveChangesAsync();
                return Ok(newMember);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMembers()
        {
            var allMembers = await _context.MemberRegistrations.ToListAsync();
            if (allMembers == null)
            {
                return NotFound();
            }
            return Ok(allMembers);
        }
    }
}